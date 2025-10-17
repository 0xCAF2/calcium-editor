// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get title => 'Calcium Editor | Programming';

  @override
  String get titleDescription =>
      'The application title shown in app window and task switchers';

  @override
  String get run => 'Run';

  @override
  String get runDescription =>
      'Label for the button that runs the user\'s code';

  @override
  String get input => 'Input';

  @override
  String get inputDescription =>
      'Label for the button that sends input to the runtime';
}
