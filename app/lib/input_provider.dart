import 'package:hooks_riverpod/hooks_riverpod.dart';

final inputProvider = NotifierProvider<InputNotifier, String?>(
  () => InputNotifier(),
  isAutoDispose: true,
);

class InputNotifier extends Notifier<String?> {
  @override
  String? build() {
    return null;
  }

  void setPrompt(String? value) {
    state = value;
  }

  void clear() {
    state = null;
  }
}
