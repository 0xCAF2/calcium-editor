import 'dart:js_interop';

import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:web/web.dart' show HTMLIFrameElement, Window, window;
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webview_flutter_web/webview_flutter_web.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends HookWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
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
      title: 'Calcium Editor | Programming', // TODO: localize title
      home: Scaffold(
        body: Column(
          children: [
            SizedBox(
              width: 1,
              height: 1,
              child: WebViewWidget(controller: runtimeController),
            ),
            ElevatedButton(
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
                runtimeWindow.run(code.toJS);
              },
              child: const Text('Run'),
            ),
            Expanded(child: WebViewWidget(controller: editorController)),
          ],
        ),
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
  external void run(JSString code);
}
