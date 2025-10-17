import 'package:app/input_provider.dart';
import 'package:app/l10n/app_localizations.dart';
import 'package:app/output_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class RuntimeDialog extends HookConsumerWidget {
  const RuntimeDialog({
    super.key,
    required this.onInput,
    required this.onClose,
  });

  final void Function(String) onInput;
  final void Function() onClose;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final input = ref.watch(inputProvider);
    final inputTextController = useTextEditingController();
    final output = ref.watch(outputProvider);

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.only(right: 8.0),
                  child: IconButton(
                    onPressed: () {
                      Navigator.of(context).pop();
                      ref.read(inputProvider.notifier).clear();
                      ref.read(outputProvider.notifier).clear();
                      onClose();
                    },
                    icon: Icon(Icons.close),
                  ),
                ),
              ],
            ),
            Text(input ?? '', overflow: TextOverflow.ellipsis),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: inputTextController,
                    enabled: input != null,
                  ),
                ),
                const SizedBox(width: 8),
                ElevatedButton(
                  onPressed: input == null
                      ? null
                      : () {
                          onInput(inputTextController.text);
                          inputTextController.clear();
                        },
                  child: Text(AppLocalizations.of(context)!.input),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Expanded(child: SingleChildScrollView(child: Text(output))),
          ],
        ),
      ),
    );
  }
}
