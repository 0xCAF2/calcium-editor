// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Japanese (`ja`).
class AppLocalizationsJa extends AppLocalizations {
  AppLocalizationsJa([String locale = 'ja']) : super(locale);

  @override
  String get title => 'カルシウム | プログラミング';

  @override
  String get titleDescription => 'アプリケーションのタイトル（ウィンドウやタスクスイッチャーに表示）';

  @override
  String get run => '実行する';

  @override
  String get runDescription => 'ユーザーのコードを実行するボタンのラベル';

  @override
  String get input => '入力する';

  @override
  String get inputDescription => 'ランタイムに入力を送るボタンのラベル';
}
