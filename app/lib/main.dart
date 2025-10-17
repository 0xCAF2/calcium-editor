import 'dart:js_interop';

import 'package:app/input_provider.dart';
import 'package:app/l10n/app_localizations.dart';
import 'package:app/output_provider.dart';
import 'package:app/runtime_dialog.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:web/web.dart'
    show HTMLIFrameElement, MessageEvent, Window, window;
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webview_flutter_web/webview_flutter_web.dart';

void main() {
  runApp(ProviderScope(child: const MainApp()));
}

class MainApp extends HookConsumerWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final editorController = useMemoized(() => WebViewController());
    final runtimeController = useMemoized(() => WebViewController());

    useEffect(() {
      WebViewPlatform.instance = WebWebViewPlatform();
      const editorUrl = String.fromEnvironment(
        'editorUrl',
        defaultValue: 'http://localhost:50080/editor/',
      );
      editorController.loadRequest(Uri.parse(editorUrl));

      const runtimeUrl = String.fromEnvironment(
        'runtimeUrl',
        defaultValue: 'http://localhost:50080/runtime/',
      );
      runtimeController.loadRequest(Uri.parse(runtimeUrl));
      return null;
    }, const []);

    return MaterialApp(
      // Localized application title (used by Android/iOS task switchers)
      onGenerateTitle: (context) => AppLocalizations.of(context)!.title,
      theme: ThemeData(primarySwatch: Colors.lightGreen),
      localizationsDelegates: [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ],
      supportedLocales: [
        const Locale('en', ''), // English
        const Locale('ja', ''), // Japanese
      ],
      home: Builder(
        builder: (context) {
          return Scaffold(
            appBar: AppBar(
              leading: IconButton(onPressed: () {}, icon: Icon(Icons.menu)),
              title: ElevatedButton.icon(
                onPressed: () {
                  final webView0 = window.webView0;
                  final editorWindow = webView0.contentWindow;
                  if (editorWindow == null) {
                    return;
                  }
                  final code = editorWindow.generateCode().toDart;

                  final webView1 = window.webView1;
                  final runtimeWindow = webView1.contentWindow;
                  if (runtimeWindow == null) {
                    return;
                  }
                  void onMessage(MessageEvent event) {
                    final output = event.data?.output?.toDart;
                    if (output != null && output.isNotEmpty) {
                      ref.read(outputProvider.notifier).append(output);
                    }

                    final input = event.data?.input?.toDart;
                    ref.read(inputProvider.notifier).setPrompt(input);

                    // TODO: handle error messages
                  }

                  runtimeWindow.onmessage = onMessage.toJS as JSFunction;

                  showDialog(
                    context: context,
                    builder: (context) {
                      return RuntimeDialog(
                        onInput: (value) {
                          runtimeWindow.input(value.toJS);
                        },
                        onClose: () {
                          runtimeWindow.onmessage = null;
                          runtimeWindow.reset();
                        },
                      );
                    },
                  );

                  runtimeWindow.run(code.toJS);
                },
                icon: const Icon(Icons.play_arrow),
                label: Builder(
                  builder: (context) => Text(AppLocalizations.of(context)!.run),
                ),
              ),
              centerTitle: true,
              actions: [
                IconButton(onPressed: () {}, icon: Icon(Icons.help_outline)),
              ],
            ),
            body: Column(
              children: [
                SizedBox(
                  width: 1,
                  height: 1,
                  child: WebViewWidget(controller: runtimeController),
                ),
                Expanded(child: WebViewWidget(controller: editorController)),
              ],
            ),
          );
        },
      ),
    );
  }
}

extension on Window {
  @JS()
  external HTMLIFrameElement get webView0;

  @JS()
  external HTMLIFrameElement get webView1;

  @JS()
  external JSString generateCode();

  @JS()
  external void input(JSString value);

  @JS()
  external void run(JSString code);

  @JS()
  external void reset();
}

extension on JSAny {
  @JS()
  external JSString? get output;

  @JS()
  external JSString? get input;
}
