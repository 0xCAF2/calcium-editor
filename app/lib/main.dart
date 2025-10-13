import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
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
      controller.loadRequest(Uri.parse('http://localhost:5173'));
      return null;
    }, const []);

    return MaterialApp(
      title: 'Calcium Editor | Programming',
      home: Scaffold(
        body: Column(
          children: [
            ElevatedButton(onPressed: () {}, child: const Text('Run')),
            Expanded(child: WebViewWidget(controller: controller)),
          ],
        ),
      ),
    );
  }
}
