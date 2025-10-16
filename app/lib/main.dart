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
    final controller = useMemoized(() => WebViewController());
    useEffect(() {
      WebViewPlatform.instance = WebWebViewPlatform();
      const url = String.fromEnvironment(
        'editorUrl',
        defaultValue: 'http://localhost:50080/editor/',
      );
      controller.loadRequest(Uri.parse(url));
      return null;
    }, const []);

    return MaterialApp(
      title: 'Calcium Editor | Programming',
      home: Scaffold(
        body: Column(
          children: [
            ElevatedButton(
              onPressed: () {
                final webView0 = window.webView0;
                final iframeWindow = webView0.contentWindow;
                if (iframeWindow == null) {
                  return;
                }
                debugPrint(iframeWindow.generateCode().toDart);
              },
              child: const Text('Run'),
            ),
            Expanded(child: WebViewWidget(controller: controller)),
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
  external JSString generateCode();
}
