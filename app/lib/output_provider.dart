import 'package:hooks_riverpod/hooks_riverpod.dart';

final outputProvider = NotifierProvider<OutputNotifier, String>(
  () => OutputNotifier(),
  isAutoDispose: true,
);

class OutputNotifier extends Notifier<String> {
  @override
  String build() {
    return '';
  }

  void append(String value) {
    state += value;
  }

  void clear() {
    state = '';
  }
}
