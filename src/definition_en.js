import Blockly from 'blockly'
import { parseFullWidthNumber } from './utils'

Blockly.defineBlocksWithJsonArray([
  {
    type: 'calcium_assign',
    message0: '%1 = %2',
    args0: [
      {
        type: 'input_value',
        name: 'REF',
        check: [
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_comma',
        ],
      },
      {
        type: 'input_value',
        name: 'VALUE',
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 270,
    tooltip: '%{BKY_CALCIUM_ASSIGN_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_compound_assign',
    message0: '%1 %2 %3',
    args0: [
      {
        type: 'input_value',
        name: 'REF',
        check: ['calcium_variable', 'calcium_attribute', 'calcium_subscript'],
      },
      {
        type: 'field_dropdown',
        name: 'OP',
        options: [
          ['+=', '+='],
          ['-=', '-='],
          ['*=', '*='],
        ],
      },
      {
        type: 'input_value',
        name: 'VALUE',
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 270,
    tooltip: '%{BKY_CALCIUM_COMPOUND_ASSIGN_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_arithmetic',
    message0: '%1 %2 %3',
    args0: [
      {
        type: 'input_value',
        name: 'LEFT',
        check: [
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'calcium_arithmetic',
          'Number',
          'String',
        ],
      },
      {
        type: 'field_dropdown',
        name: 'OP',
        options: [
          ['+', '+'],
          ['-', '-'],
          ['*', '*'],
          ['//', '//'],
          ['/', '/'],
          ['**', '**'],
          ['%', '%'],
        ],
      },
      {
        type: 'input_value',
        name: 'RIGHT',
        check: [
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'calcium_arithmetic',
          'Number',
          'String',
        ],
      },
    ],
    inputsInline: true,
    output: 'calcium_arithmetic',
    colour: 75,
    tooltip: '%{BKY_CALCIUM_ARITHMETIC_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_attribute',
    message0: '%1 . %2',
    args0: [
      {
        type: 'input_value',
        name: 'REF',
        check: ['calcium_variable', 'calcium_attribute', 'String'],
      },
      {
        type: 'field_input',
        name: 'ATTR',
        text: 'name',
      },
    ],
    inputsInline: true,
    output: 'calcium_attribute',
    colour: 75,
    tooltip: '%{BKY_CALCIUM_ATTRIBUTE_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_break_continue',
    message0: '%1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'FLOW',
        options: [
          ['break', 'break'],
          ['continue', 'continue'],
        ],
      },
    ],
    previousStatement: null,
    colour: 270,
    tooltip: '%{BKY_CALCIUM_BREAK_CONTINUE_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_expr_stmt',
    message0: '%1',
    args0: [
      {
        type: 'input_value',
        name: 'CALL',
        check: ['calcium_call'],
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 270,
    tooltip: '%{BKY_CALCIUM_EXPR_STMT_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_class_def',
    message0: 'class %1 (%2): %3 %4',
    args0: [
      {
        type: 'field_input',
        name: 'NAME',
        text: 'MyClass',
      },
      {
        type: 'input_value',
        name: 'SUPERCLASS',
        check: ['calcium_variable', 'calcium_attribute'],
        align: 'RIGHT',
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'STMTS',
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 270,
    tooltip: '%{BKY_CALCIUM_CLASS_DEF_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_dict',
    message0: '{ }',
    output: 'calcium_dict',
    colour: 75,
    tooltip: '%{BKY_CALCIUM_DICT_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_for',
    message0: 'for %1 in %2 : %3 %4',
    args0: [
      {
        type: 'input_value',
        name: 'VARS',
        check: ['calcium_variable', 'calcium_comma'],
      },
      {
        type: 'input_value',
        name: 'ITER',
        check: [
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'String',
          'Array',
        ],
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'STMTS',
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 270,
    tooltip: '%{BKY_CALCIUM_FOR_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_import',
    message0: 'import %1',
    args0: [
      {
        type: 'field_input',
        name: 'NAME',
        text: 'random',
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 270,
    tooltip: '%{BKY_CALCIUM_IMPORT_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_kwarg',
    message0: '%1 = %2',
    args0: [
      {
        type: 'field_input',
        name: 'NAME',
        text: 'end',
      },
      {
        type: 'input_value',
        name: 'VALUE',
      },
    ],
    inputsInline: true,
    output: 'calcium_kwarg',
    colour: 75,
    tooltip: '%{BKY_CALCIUM_KWARG_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_logical',
    message0: '%1 %2 %3',
    args0: [
      {
        type: 'input_value',
        name: 'LEFT',
        check: [
          'Boolean',
          'calcium_variable',
          'calcium_attribute',
          'calcium_call',
          'calcium_subscript',
          'calcium_arithmetic',
        ],
      },
      {
        type: 'field_dropdown',
        name: 'OP',
        options: [
          ['and', 'and'],
          ['or', 'or'],
        ],
      },
      {
        type: 'input_value',
        name: 'RIGHT',
        check: [
          'Boolean',
          'calcium_variable',
          'calcium_attribute',
          'calcium_call',
          'calcium_subscript',
          'calcium_arithmetic',
        ],
      },
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: 75,
    tooltip: '%{BKY_CALCIUM_LOGICAL_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_pass',
    message0: 'pass',
    previousStatement: null,
    nextStatement: null,
    colour: 270,
    tooltip: '%{BKY_CALCIUM_PASS_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_return',
    message0: 'return %1',
    args0: [
      {
        type: 'input_value',
        name: 'VALUE',
      },
    ],
    previousStatement: null,
    colour: 270,
    tooltip: '%{BKY_CALCIUM_RETURN_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_slice',
    message0: '%1 : %2',
    args0: [
      {
        type: 'input_value',
        name: 'START',
        check: [
          'Number',
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'calcium_arithmetic',
        ],
      },
      {
        type: 'input_value',
        name: 'END',
        check: [
          'Number',
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'calcium_arithmetic',
        ],
      },
    ],
    inputsInline: true,
    output: 'calcium_slice',
    colour: 75,
    tooltip: '%{BKY_CALCIUM_SLICE_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_str',
    message0: '"%1"',
    args0: [
      {
        type: 'field_input',
        name: 'STR',
        text: '',
      },
    ],
    inputsInline: true,
    output: 'String',
    colour: 75,
    tooltip: '%{BKY_CALCIUM_STR_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_subscript',
    message0: '%1 [ %2 ]',
    args0: [
      {
        type: 'input_value',
        name: 'REF',
        check: ['calcium_variable', 'calcium_attribute', 'calcium_subscript'],
      },
      {
        type: 'input_value',
        name: 'SUB',
        check: [
          'Number',
          'String',
          'calcium_variable',
          'calcium_attribute',
          'calcium_call',
          'calcium_arithmetic',
          'calcium_slice',
        ],
      },
    ],
    inputsInline: true,
    output: 'calcium_subscript',
    colour: 75,
    tooltip: '%{BKY_CALCIUM_SUBSCRIPT_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_variable',
    message0: '%1',
    args0: [
      {
        type: 'field_input',
        name: 'NAME',
        text: 'self',
      },
    ],
    inputsInline: true,
    output: 'calcium_variable',
    colour: 75,
    tooltip: '%{BKY_CALCIUM_VARIABLE_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_while',
    message0: 'while %1: %2 %3',
    args0: [
      {
        type: 'input_value',
        name: 'COND',
        check: [
          'Boolean',
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'calcium_arithmetic',
        ],
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'STMTS',
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 270,
    tooltip: '%{BKY_CALCIUM_WHILE_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_add_repr',
    message0: '%{BKY_CALCIUM_ADD_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'REF',
        check: ['calcium_variable', 'calcium_attribute', 'calcium_subscript'],
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: [
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_slice',
          'calcium_call',
          'calcium_arithmetic',
          'Number',
          'String',
          'Array',
        ],
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 240,
    tooltip: '%{BKY_CALCIUM_ADD_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_arithmetic_repr',
    message0: '%1 %2 %3',
    args0: [
      {
        type: 'input_value',
        name: 'LEFT',
        check: [
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'calcium_arithmetic',
          'Number',
          'String',
        ],
      },
      {
        type: 'field_dropdown',
        name: 'OP',
        options: [
          ['%{BKY_CALCIUM_ARITHMETIC_ADD}', '+'],
          ['%{BKY_CALCIUM_ARITHMETIC_SUBTRACT}', '-'],
          ['%{BKY_CALCIUM_ARITHMETIC_MULTIPLICATE}', '*'],
          ['%{BKY_CALCIUM_ARITHMETIC_FLOOR_DIVIDE}', '//'],
          ['%{BKY_CALCIUM_ARITHMETIC_DIVIDE}', '/'],
          ['%{BKY_CALCIUM_ARITHMETIC_EXPONENTIATE}', '**'],
          ['%{BKY_CALCIUM_ARITHMETIC_REMAIN}', '%'],
        ],
      },
      {
        type: 'input_value',
        name: 'RIGHT',
        check: [
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'calcium_arithmetic',
          'Number',
          'String',
        ],
      },
    ],
    inputsInline: true,
    output: 'calcium_arithmetic',
    colour: 120,
    tooltip: '%{BKY_CALCIUM_ARITHMETIC_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_assign_repr',
    message0: '%{BKY_CALCIUM_ASSIGN_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'REF',
        check: ['calcium_variable', 'calcium_attribute', 'calcium_subscript'],
      },
      {
        type: 'input_value',
        name: 'VALUE',
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 240,
    tooltip: '%{BKY_CALCIUM_ASSIGN_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_attribute_repr',
    message0: '%{BKY_CALCIUM_ATTRIBUTE_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'REF',
        check: ['calcium_variable', 'calcium_attribute', 'String'],
      },
      {
        type: 'field_input',
        name: 'ATTR',
        text: 'name',
      },
    ],
    inputsInline: true,
    output: 'calcium_attribute',
    colour: 195,
    tooltip: '%{BKY_CALCIUM_ATTRIBUTE_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_bitwise',
    message0: '%1 %2 %3',
    args0: [
      {
        type: 'input_value',
        name: 'LEFT',
        check: [
          'Number',
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'calcium_arithmetic',
        ],
      },
      {
        type: 'field_dropdown',
        name: 'OP',
        options: [
          ['<<', '<<'],
          ['>>', '>>'],
          ['&', '&'],
          ['|', '|'],
          ['^', '^'],
        ],
      },
      {
        type: 'input_value',
        name: 'RIGHT',
        check: [
          'Number',
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'calcium_arithmetic',
        ],
      },
    ],
    inputsInline: true,
    output: 'Number',
    colour: 75,
    tooltip: '%{BKY_CALCIUM_BITWISE_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_bitwise_not',
    message0: '~ %1',
    args0: [
      {
        type: 'input_value',
        name: 'VALUE',
        check: [
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'calcium_arithmetic',
          'Number',
        ],
      },
    ],
    inputsInline: true,
    output: 'Number',
    colour: 75,
    tooltip: '%{BKY_CALCIUM_BITWISE_NOT_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_boolean',
    message0: '%1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'VALUE',
        options: [
          ['True', 'true'],
          ['False', 'false'],
        ],
      },
    ],
    output: 'Boolean',
    colour: 75,
    tooltip: '%{BKY_CALCIUM_BOOLEAN_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_boolean_repr',
    message0: '%1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'VALUE',
        options: [
          ['%{BKY_CALCIUM_BOOLEAN_TRUE}', 'true'],
          ['%{BKY_CALCIUM_BOOLEAN_FALSE}', 'false'],
        ],
      },
    ],
    output: 'Boolean',
    colour: 120,
    tooltip: '%{BKY_CALCIUM_BOOLEAN_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_break_continue_repr',
    message0: '%1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'FLOW',
        options: [
          ['%{BKY_CALCIUM_BREAK}', 'break'],
          ['%{BKY_CALCIUM_CONTINUE}', 'continue'],
        ],
      },
    ],
    previousStatement: null,
    colour: 240,
    tooltip: '%{BKY_CALCIUM_BREAK_CONTINUE_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_call_arg',
    message0: '%{BKY_CALCIUM_CALL_ARG_TITLE}',
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip: '%{BKY_CALCIUM_CALL_ARG_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_call_arg_container',
    message0: '%1',
    args0: [
      {
        type: 'input_statement',
        name: 'ARGS',
      },
    ],
    colour: 240,
    tooltip: '',
    helpUrl: '',
  },
  {
    type: 'calcium_comma',
    message0: '%1, %2',
    args0: [
      {
        type: 'input_value',
        name: 'FIRST',
      },
      {
        type: 'input_value',
        name: 'SECOND',
      },
    ],
    output: 'calcium_comma',
    inputsInline: true,
    colour: 75,
    tooltip: '%{BKY_CALCIUM_COMMA_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_class_repr',
    message0: '%{BKY_CALCIUM_CLASS_TITLE}',
    args0: [
      {
        type: 'field_input',
        name: 'NAME',
        text: 'MyClass',
      },
    ],
    inputsInline: true,
    output: 'calcium_class',
    colour: 195,
    tooltip: '%{BKY_CALCIUM_CLASS_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_class_def_repr',
    message0: '%{BKY_CALCIUM_CLASS_DEF_TITLE}',
    args0: [
      {
        type: 'field_input',
        name: 'NAME',
        text: 'MyClass',
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_value',
        name: 'SUPERCLASS',
        check: ['calcium_variable', 'calcium_attribute'],
        align: 'RIGHT',
      },
      {
        type: 'input_statement',
        name: 'STMTS',
      },
    ],
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: 240,
    tooltip: '%{BKY_CALCIUM_CLASS_DEF_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_def_param',
    message0: '%{BKY_CALCIUM_DEF_PARAM_TITLE}',
    args0: [
      {
        type: 'field_input',
        name: 'PARAM',
        text: 'a',
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip: '%{BKY_CALCIUM_DEF_PARAM_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_def_param_container',
    message0: '%1',
    args0: [
      {
        type: 'input_statement',
        name: 'PARAMS',
      },
    ],
    colour: 240,
    tooltip: '',
    helpUrl: '',
  },
  {
    type: 'calcium_dict_repr',
    message0: '%{BKY_CALCIUM_DICT_TITLE}',
    output: 'calcium_dict',
    colour: 120,
    tooltip: '%{BKY_CALCIUM_DICT_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_for_repr',
    message0: '%{BKY_CALCIUM_FOR_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'VARS',
        check: ['calcium_variable', 'calcium_comma'],
      },
      {
        type: 'input_value',
        name: 'ITER',
        check: [
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'String',
          'Array',
        ],
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'STMTS',
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 240,
    tooltip: '%{BKY_CALCIUM_FOR_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_for_range_repr',
    message0: '%{BKY_CALCIUM_FOR_RANGE_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'VARS',
        check: ['calcium_variable'],
      },
      {
        type: 'input_value',
        name: 'START',
        check: [
          'Number',
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_arithmetic',
        ],
      },
      {
        type: 'input_value',
        name: 'STOP',
        check: [
          'Number',
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_arithmetic',
        ],
      },
      {
        type: 'input_value',
        name: 'STEP',
        check: [
          'Number',
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_arithmetic',
        ],
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'STMTS',
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 240,
    tooltip: '%{BKY_CALCIUM_FOR_RANGE_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_function_repr',
    message0: '%{BKY_CALCIUM_FUNCTION_TITLE}',
    args0: [
      {
        type: 'field_input',
        name: 'NAME',
        text: 'print',
      },
    ],
    inputsInline: true,
    output: 'calcium_function',
    colour: 195,
    tooltip: '%{BKY_CALCIUM_FUNCTION_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_import_repr',
    message0: '%{BKY_CALCIUM_IMPORT_TITLE}',
    args0: [
      {
        type: 'field_input',
        name: 'NAME',
        text: 'random',
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 240,
    tooltip: '%{BKY_CALCIUM_IMPORT_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_list_item',
    message0: '%{BKY_CALCIUM_LIST_ITEM_TITLE}',
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip: '%{BKY_CALCIUM_LIST_ITEM_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_list_item_container',
    message0: '%1',
    args0: [
      {
        type: 'input_statement',
        name: 'STACK',
      },
    ],
    colour: 120,
    tooltip: '',
    helpUrl: '',
  },
  {
    type: 'calcium_logical_repr',
    message0: '%1 %2 %3',
    args0: [
      {
        type: 'input_value',
        name: 'LEFT',
        check: [
          'Boolean',
          'calcium_variable',
          'calcium_attribute',
          'calcium_call',
          'calcium_subscript',
        ],
      },
      {
        type: 'field_dropdown',
        name: 'OP',
        options: [
          ['%{BKY_CALCIUM_LOGICAL_AND}', 'and'],
          ['%{BKY_CALCIUM_LOGICAL_OR}', 'or'],
        ],
      },
      {
        type: 'input_value',
        name: 'RIGHT',
        check: ['Boolean'],
      },
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: 120,
    tooltip: '%{BKY_CALCIUM_LOGICAL_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_method_repr',
    message0: '%{BKY_CALCIUM_METHOD_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'REF',
        check: ['calcium_variable', 'calcium_attribute', 'String'],
      },
      {
        type: 'field_input',
        name: 'ATTR',
        text: 'append',
      },
    ],
    inputsInline: true,
    output: 'calcium_method',
    colour: 195,
    tooltip: '%{BKY_CALCIUM_METHOD_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_none',
    message0: 'None',
    output: 'calcium_none',
    colour: 75,
    tooltip: '%{BKY_CALCIUM_NONE_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_not',
    message0: 'not %1',
    args0: [
      {
        type: 'input_value',
        name: 'VALUE',
        check: [
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'Boolean',
        ],
      },
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: 75,
    tooltip: '%{BKY_CALCIUM_NOT_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_not_repr',
    message0: '%{BKY_CALCIUM_NOT_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'VALUE',
        check: [
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'Boolean',
        ],
      },
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: 120,
    tooltip: '%{BKY_CALCIUM_NOT_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_relational_repr',
    message0: '%1 %2 %3',
    args0: [
      {
        type: 'input_value',
        name: 'LEFT',
        check: [
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'calcium_arithmetic',
          'Number',
          'String',
        ],
      },
      {
        type: 'field_dropdown',
        name: 'OP',
        options: [
          ['%{BKY_CALCIUM_RELATIONAL_EQUAL}', '=='],
          ['%{BKY_CALCIUM_RELATIONAL_NOT_EQUAL}', '!='],
          ['%{BKY_CALCIUM_RELATIONAL_LESS_THAN}', '<'],
          ['%{BKY_CALCIUM_RELATIONAL_LESS_THAN_OR_EQUAL}', '<='],
          ['%{BKY_CALCIUM_RELATIONAL_GREATER_THAN}', '>'],
          ['%{BKY_CALCIUM_RELATIONAL_GREATER_THAN_OR_EQUAL}', '>='],
          ['%{BKY_CALCIUM_RELATIONAL_IN}', 'in'],
          ['%{BKY_CALCIUM_RELATIONAL_NOT_IN}', 'not in'],
        ],
      },
      {
        type: 'input_value',
        name: 'RIGHT',
        check: [
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'calcium_arithmetic',
          'Number',
          'String',
          'calcium_none',
        ],
      },
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: 120,
    tooltip: '%{BKY_CALCIUM_RELATIONAL_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_relational',
    message0: '%1 %2 %3',
    args0: [
      {
        type: 'input_value',
        name: 'LEFT',
        check: [
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'calcium_arithmetic',
          'Number',
          'String',
        ],
      },
      {
        type: 'field_dropdown',
        name: 'OP',
        options: [
          ['==', '=='],
          ['!=', '!='],
          ['<', '<'],
          ['<=', '<='],
          ['>', '>'],
          ['>=', '>='],
          ['in', 'in'],
          ['not in', 'not in'],
        ],
      },
      {
        type: 'input_value',
        name: 'RIGHT',
        check: [
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'calcium_arithmetic',
          'Number',
          'String',
          'calcium_none',
        ],
      },
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: 75,
    tooltip: '%{BKY_CALCIUM_RELATIONAL_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_return_repr',
    message0: '%{BKY_CALCIUM_RETURN_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'VALUE',
      },
    ],
    previousStatement: null,
    colour: 240,
    tooltip: '%{BKY_CALCIUM_RETURN_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_slice_repr',
    message0: '%{BKY_CALCIUM_SLICE_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'START',
        check: [
          'Number',
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'calcium_arithmetic',
        ],
      },
      {
        type: 'input_value',
        name: 'END',
        check: [
          'Number',
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'calcium_arithmetic',
        ],
      },
    ],
    inputsInline: true,
    output: 'calcium_slice',
    colour: 195,
    tooltip: '%{BKY_CALCIUM_SLICE_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_str_repr',
    message0: '%{BKY_CALCIUM_STR_TITLE}',
    args0: [
      {
        type: 'field_input',
        name: 'STR',
        text: '',
      },
    ],
    inputsInline: true,
    output: 'String',
    colour: 120,
    tooltip: '%{BKY_CALCIUM_STR_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_subscript_repr',
    message0: '%{BKY_CALCIUM_SUBSCRIPT_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'REF',
        check: ['calcium_variable', 'calcium_attribute', 'calcium_subscript'],
      },
      {
        type: 'input_value',
        name: 'SUB',
        check: [
          'Number',
          'String',
          'calcium_variable',
          'calcium_arithmetic',
          'calcium_slice',
        ],
      },
    ],
    inputsInline: true,
    output: 'calcium_subscript',
    colour: 195,
    tooltip: '%{BKY_CALCIUM_SUBSCRIPT_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_variable_repr',
    message0: '%{BKY_CALCIUM_VARIABLE_TITLE}',
    args0: [
      {
        type: 'field_input',
        name: 'NAME',
        text: 'self',
      },
    ],
    inputsInline: true,
    output: 'calcium_variable',
    colour: 0,
    tooltip: '%{BKY_CALCIUM_VARIABLE_TOOLTIP}',
    helpUrl: '',
  },
  {
    type: 'calcium_while_repr',
    message0: '%{BKY_CALCIUM_WHILE_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'COND',
        check: [
          'Boolean',
          'calcium_variable',
          'calcium_attribute',
          'calcium_subscript',
          'calcium_call',
          'calcium_arithmetic',
        ],
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'STMTS',
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 240,
    tooltip: '%{BKY_CALCIUM_WHILE_TOOLTIP}',
    helpUrl: '',
  },
])

export default [
  {
    kind: 'category',
    name: 'Core',
    contents: [
      {
        kind: 'block',
        type: 'calcium_variable_repr',
      },
      {
        kind: 'block',
        type: 'calcium_attribute_repr',
      },
      {
        kind: 'block',
        type: 'calcium_subscript_repr',
      },
      {
        kind: 'block',
        type: 'calcium_slice_repr',
      },
      {
        kind: 'block',
        type: 'calcium_arithmetic_repr',
      },
      {
        kind: 'block',
        type: 'calcium_number',
      },
      {
        kind: 'block',
        type: 'calcium_str_repr',
      },
      {
        kind: 'block',
        type: 'calcium_list_repr',
      },
      {
        kind: 'block',
        type: 'calcium_dict_repr',
      },
      {
        kind: 'block',
        type: 'calcium_assign_repr',
      },
      {
        kind: 'block',
        type: 'calcium_print_repr',
      },
      {
        kind: 'block',
        type: 'calcium_import_repr',
      },
    ],
  },
  {
    kind: 'category',
    name: 'Logic',
    contents: [
      {
        kind: 'block',
        type: 'calcium_relational_repr',
      },
      {
        kind: 'block',
        type: 'calcium_logical_repr',
      },
      {
        kind: 'block',
        type: 'calcium_not_repr',
      },
      {
        kind: 'block',
        type: 'calcium_boolean_repr',
      },
      {
        kind: 'block',
        type: 'calcium_if_repr',
      },
    ],
  },
  {
    kind: 'category',
    name: 'Loop',
    contents: [
      {
        kind: 'block',
        type: 'calcium_for_range_repr',
      },
      {
        kind: 'block',
        type: 'calcium_for_repr',
      },
      {
        kind: 'block',
        type: 'calcium_while_repr',
      },
      {
        kind: 'block',
        type: 'calcium_break_continue_repr',
      },
    ],
  },
  {
    kind: 'category',
    name: 'Function',
    contents: [
      {
        kind: 'block',
        type: 'calcium_function_repr',
      },
      {
        kind: 'block',
        type: 'calcium_method_repr',
      },
      {
        kind: 'block',
        type: 'calcium_call_repr',
      },
      {
        kind: 'block',
        type: 'calcium_callnoreturn_repr',
      },
      {
        kind: 'block',
        type: 'calcium_callreturn_repr',
      },
      {
        kind: 'block',
        type: 'calcium_def_repr',
      },
      {
        kind: 'block',
        type: 'calcium_return_repr',
      },
    ],
  },
  {
    kind: 'category',
    name: 'Class',
    contents: [
      {
        kind: 'block',
        type: 'calcium_class_repr',
      },
      {
        kind: 'block',
        type: 'calcium_class_def_repr',
      },
      {
        kind: 'block',
        type: 'calcium_defmethod_repr',
      },
    ],
  },
  {
    kind: 'category',
    name: 'Python 1',
    contents: [
      {
        kind: 'block',
        type: 'calcium_variable',
      },
      {
        kind: 'block',
        type: 'calcium_attribute',
      },
      {
        kind: 'block',
        type: 'calcium_subscript',
      },
      {
        kind: 'block',
        type: 'calcium_slice',
      },
      {
        kind: 'block',
        type: 'calcium_comma',
      },
      {
        kind: 'block',
        type: 'calcium_call',
      },
      {
        kind: 'block',
        type: 'calcium_kwarg',
      },
      {
        kind: 'block',
        type: 'calcium_arithmetic',
      },
      {
        kind: 'block',
        type: 'calcium_number',
      },
      {
        kind: 'block',
        type: 'calcium_str',
      },
      {
        kind: 'block',
        type: 'calcium_list',
      },
      {
        kind: 'block',
        type: 'calcium_dict',
      },
      {
        kind: 'block',
        type: 'calcium_none',
      },
      {
        kind: 'block',
        type: 'calcium_relational',
      },
      {
        kind: 'block',
        type: 'calcium_logical',
      },
      {
        kind: 'block',
        type: 'calcium_not',
      },
      {
        kind: 'block',
        type: 'calcium_boolean',
      },
      {
        kind: 'block',
        type: 'calcium_bitwise',
      },
      {
        kind: 'block',
        type: 'calcium_bitwise_not',
      },
    ],
  },
  {
    kind: 'category',
    name: 'Python 2',
    contents: [
      {
        kind: 'block',
        type: 'calcium_expr_stmt',
      },
      {
        kind: 'block',
        type: 'calcium_assign',
      },
      {
        kind: 'block',
        type: 'calcium_compound_assign',
      },
      {
        kind: 'block',
        type: 'calcium_if',
      },
      {
        kind: 'block',
        type: 'calcium_for',
      },
      {
        kind: 'block',
        type: 'calcium_while',
      },
      {
        kind: 'block',
        type: 'calcium_break_continue',
      },
      {
        kind: 'block',
        type: 'calcium_def',
      },
      {
        kind: 'block',
        type: 'calcium_return',
      },
      {
        kind: 'block',
        type: 'calcium_class_def',
      },
      {
        kind: 'block',
        type: 'calcium_defmethod',
      },
      {
        kind: 'block',
        type: 'calcium_import',
      },
      {
        kind: 'block',
        type: 'calcium_pass',
      },
    ],
  },
]

Blockly.Blocks['calcium_call'] = {
  init() {
    this.jsonInit({
      type: 'calcium_call',
      message0: '%1',
      args0: [
        {
          type: 'input_value',
          name: 'REF',
          check: [
            'calcium_function',
            'calcium_class',
            'calcium_method',
            'calcium_variable',
            'calcium_attribute',
          ],
        },
      ],

      output: 'calcium_call',
      colour: 75,
      tooltip: '%{BKY_CALCIUM_CALL_TOOLTIP}',
      helpUrl: '',
    })
    this.setInputsInline(true)
    this.countOfArguments = 0
    this.updateShape()
    this.setMutator(new Blockly.Mutator(['calcium_call_arg']))
  },
  compose(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('ARGS')
    const connections = []
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_)
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
    }
    for (let i = 0; i < this.countOfArguments; ++i) {
      const connection = this.getInput('ARG' + i).connection.targetConnection
      if (connection && connections.indexOf(connection) === -1) {
        connection.disconnect()
      }
    }
    this.countOfArguments = connections.length
    this.updateShape()
    for (let i = 0; i < this.countOfArguments; ++i) {
      Blockly.Mutator.reconnect(connections[i], this, 'ARG' + i)
    }
  },
  decompose(workspace) {
    const containerBlock = workspace.newBlock('calcium_call_arg_container')
    containerBlock.initSvg()
    let connection = containerBlock.getInput('ARGS').connection
    for (let i = 0; i < this.countOfArguments; ++i) {
      const itemBlock = workspace.newBlock('calcium_call_arg')
      itemBlock.initSvg()
      connection.connect(itemBlock.previousConnection)
      connection = itemBlock.nextConnection
    }
    return containerBlock
  },
  saveExtraState: function () {
    return {
      countOfArguments: this.countOfArguments,
    }
  },

  loadExtraState: function (state) {
    this.countOfArguments = state['countOfArguments']
    this.updateShape()
  },
  saveConnections: function (containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('ARGS')
    let i = 0
    while (itemBlock) {
      const input = this.getInput('ARG' + i)
      itemBlock.valueConnection_ = input && input.connection.targetConnection
      ++i
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
    }
  },
  updateShape() {
    if (this.getInput('CLOSE_PAREN')) {
      this.removeInput('CLOSE_PAREN')
    }
    let i
    for (i = 0; i < this.countOfArguments; ++i) {
      if (!this.getInput('ARG' + i)) {
        const input = this.appendValueInput('ARG' + i)
        input.init()
        if (i === 0) {
          input.appendField('(')
        } else {
          input.appendField(',')
        }
      }
    }
    if (i > 0) {
      const dummy = this.appendDummyInput('CLOSE_PAREN')
      dummy.appendField(')')
    }
    if (i === 0 && !this.getInput('PAREN')) {
      const dummy = this.appendDummyInput('PAREN')
      dummy.appendField('( )')
    } else if (i !== 0 && this.getInput('PAREN')) {
      this.removeInput('PAREN')
    }
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i)
      ++i
    }
  },
}

Blockly.Blocks['calcium_def'] = {
  init() {
    this.jsonInit({
      type: 'calcium_def',
      message0: 'def %1 ( %2 ): %3 %4',
      args0: [
        {
          type: 'field_input',
          name: 'NAME',
          text: 'f',
        },
        {
          type: 'field_label_serializable',
          name: 'LABELS',
          text: '',
        },
        {
          type: 'input_dummy',
        },
        {
          type: 'input_statement',
          name: 'STMTS',
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 270,
      tooltip: '%{BKY_CALCIUM_DEF_TOOLTIP}',
      helpUrl: '',
    })
    this.countOfParameters = 0
    this.updateShape()
    this.setMutator(new Blockly.Mutator(['calcium_def_param']))
  },
  compose(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('PARAMS')
    const connections = []
    this.parameters = []
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_)
      this.parameters.push(itemBlock.getFieldValue('PARAM'))
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
    }
    this.countOfParameters = connections.length
    this.updateShape()
  },
  decompose(workspace) {
    const containerBlock = workspace.newBlock('calcium_def_param_container')
    containerBlock.initSvg()
    let connection = containerBlock.getInput('PARAMS').connection
    for (let i = 0; i < this.countOfParameters; ++i) {
      const itemBlock = workspace.newBlock('calcium_def_param')
      itemBlock.initSvg()
      itemBlock.setFieldValue(this.parameters[i], 'PARAM')
      connection.connect(itemBlock.previousConnection)
      connection = itemBlock.nextConnection
    }
    return containerBlock
  },
  saveExtraState() {
    return {
      countOfParameters: this.countOfParameters,
      parameters: this.parameters,
    }
  },
  loadExtraState(state) {
    this.countOfParameters = state['countOfParameters']
    this.parameters = state['parameters']
    this.updateShape()
  },
  updateShape() {
    if (this.parameters) {
      let labelStr = ''
      if (this.countOfParameters > 0) {
        labelStr = `${this.parameters.join(', ')}`
      }
      Blockly.Events.disable()
      try {
        this.setFieldValue(labelStr, 'LABELS')
      } finally {
        Blockly.Events.enable()
      }
    }
  },
}

Blockly.Blocks['calcium_defmethod'] = {
  init() {
    this.jsonInit({
      type: 'calcium_defmethod',
      message0: 'def %1 %2 %3 %4',
      args0: [
        {
          type: 'field_input',
          name: 'NAME',
          text: '__init__',
        },
        {
          type: 'field_label_serializable',
          name: 'LABELS',
          text: '',
        },
        {
          type: 'input_dummy',
        },
        {
          type: 'input_statement',
          name: 'STMTS',
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 270,
      tooltip: '%{BKY_CALCIUM_DEF_METHOD_TOOLTIP}',
      helpUrl: '',
    })
    this.countOfParameters = 0
    this.updateShape()
    this.setMutator(new Blockly.Mutator(['calcium_def_param']))
  },
  compose: Blockly.Blocks['calcium_def'].compose,
  decompose: Blockly.Blocks['calcium_def'].decompose,
  loadExtraState: Blockly.Blocks['calcium_def'].loadExtraState,
  saveExtraState: Blockly.Blocks['calcium_def'].saveExtraState,
  saveConnections: Blockly.Blocks['calcium_def'].saveConnections,
  updateShape() {
    let labelStr = ''
    if (this.countOfParameters > 0) {
      if (this.parameters) {
        labelStr = `(self, ${this.parameters.join(', ')}):`
      }
    } else {
      labelStr = `(self):`
    }
    Blockly.Events.disable()
    try {
      this.setFieldValue(labelStr, 'LABELS')
    } finally {
      Blockly.Events.enable()
    }
  },
}

Blockly.Blocks['calcium_if'] = {
  init: function () {
    this.jsonInit(
      // Block for if/elseif/else condition.
      {
        type: 'calcium_if',
        message0: 'if %1 :',
        args0: [
          {
            type: 'input_value',
            name: 'IF0',
            check: [
              'Boolean',
              'calcium_variable',
              'calcium_attribute',
              'calcium_subscript',
              'calcium_call',
              'calcium_arithmetic',
            ],
          },
        ],
        message1: '%1',
        args1: [
          {
            type: 'input_statement',
            name: 'DO0',
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 270,
        tooltip: '%{BKY_CALCIUM_IF_TOOLTIP}',
        helpUrl: '',
      }
    )
    this.setMutator(
      new Blockly.Mutator(['calcium_if_elseif', 'calcium_if_else'])
    )
  },
  elseifCount_: 0,
  elseCount_: 0,

  /**
   * Don't automatically add STATEMENT_PREFIX and STATEMENT_SUFFIX to generated
   * code.  These will be handled manually in this block's generators.
   */
  suppressPrefixSuffix: true,

  saveExtraState() {
    return {
      elseifCount: this.elseifCount_,
      elseCount: this.elseCount_,
    }
  },
  loadExtraState(state) {
    this.elseifCount_ = state['elseifCount']
    this.elseCount_ = state['elseCount']
    this.rebuildShape_()
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this {Blockly.Block}
   */
  decompose: function (workspace) {
    var containerBlock = workspace.newBlock('calcium_if_if')
    containerBlock.initSvg()
    var connection = containerBlock.nextConnection
    for (var i = 1; i <= this.elseifCount_; i++) {
      var elseifBlock = workspace.newBlock('calcium_if_elseif')
      elseifBlock.initSvg()
      connection.connect(elseifBlock.previousConnection)
      connection = elseifBlock.nextConnection
    }
    if (this.elseCount_) {
      var elseBlock = workspace.newBlock('calcium_if_else')
      elseBlock.initSvg()
      connection.connect(elseBlock.previousConnection)
    }
    return containerBlock
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  compose: function (containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock()
    // Count number of inputs.
    this.elseifCount_ = 0
    this.elseCount_ = 0
    var valueConnections = [null]
    var statementConnections = [null]
    var elseStatementConnection = null
    while (clauseBlock && !clauseBlock.isInsertionMarker()) {
      switch (clauseBlock.type) {
        case 'calcium_if_elseif':
          this.elseifCount_++
          valueConnections.push(clauseBlock.valueConnection_)
          statementConnections.push(clauseBlock.statementConnection_)
          break
        case 'calcium_if_else':
          this.elseCount_++
          elseStatementConnection = clauseBlock.statementConnection_
          break
        default:
          throw TypeError('Unknown block type: ' + clauseBlock.type)
      }
      clauseBlock =
        clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock()
    }
    this.updateShape_()
    // Reconnect any child blocks.
    this.reconnectChildBlocks_(
      valueConnections,
      statementConnections,
      elseStatementConnection
    )
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  saveConnections: function (containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock()
    var i = 1
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'calcium_if_elseif':
          var inputIf = this.getInput('IF' + i)
          var inputDo = this.getInput('DO' + i)
          clauseBlock.valueConnection_ =
            inputIf && inputIf.connection.targetConnection
          clauseBlock.statementConnection_ =
            inputDo && inputDo.connection.targetConnection
          i++
          break
        case 'calcium_if_else':
          var inputDo2 = this.getInput('ELSE')
          clauseBlock.statementConnection_ =
            inputDo2 && inputDo2.connection.targetConnection
          break
        default:
          throw TypeError('Unknown block type: ' + clauseBlock.type)
      }
      clauseBlock =
        clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock()
    }
  },
  /**
   * Reconstructs the block with all child blocks attached.
   * @this {Blockly.Block}
   */
  rebuildShape_: function () {
    var valueConnections = [null]
    var statementConnections = [null]
    var elseStatementConnection = null

    if (this.getInput('ELSE')) {
      elseStatementConnection =
        this.getInput('ELSE').connection.targetConnection
    }
    var i = 1
    while (this.getInput('IF' + i)) {
      var inputIf = this.getInput('IF' + i)
      var inputDo = this.getInput('DO' + i)
      valueConnections.push(inputIf.connection.targetConnection)
      statementConnections.push(inputDo.connection.targetConnection)
      i++
    }
    this.updateShape_()
    this.reconnectChildBlocks_(
      valueConnections,
      statementConnections,
      elseStatementConnection
    )
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @this {Blockly.Block}
   * @private
   */
  updateShape_: function () {
    // Delete everything.
    if (this.getInput('ELSE')) {
      this.removeInput('ELSE')
    }
    var i = 1
    while (this.getInput('IF' + i)) {
      this.removeInput('IF' + i)
      this.removeInput(':' + i)
      this.removeInput('DO' + i)
      i++
    }
    // Rebuild block.
    for (i = 1; i <= this.elseifCount_; i++) {
      this.appendValueInput('IF' + i)
        .setCheck('Boolean')
        .appendField('elif')
      this.appendDummyInput(':' + i).appendField(':')
      this.appendStatementInput('DO' + i).appendField('')
    }
    if (this.elseCount_) {
      this.appendStatementInput('ELSE').appendField('else:')
    }
  },
  /**
   * Reconnects child blocks.
   * @param {!Array.<?Blockly.RenderedConnection>} valueConnections List of
   * value connections for 'if' input.
   * @param {!Array.<?Blockly.RenderedConnection>} statementConnections List of
   * statement connections for 'do' input.
   * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
   * connection for else input.
   * @this {Blockly.Block}
   */
  reconnectChildBlocks_: function (
    valueConnections,
    statementConnections,
    elseStatementConnection
  ) {
    for (var i = 1; i <= this.elseifCount_; i++) {
      Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i)
      Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i)
    }
    Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE')
  },
}

Blockly.Blocks['calcium_list'] = {
  init: function () {
    this.jsonInit({
      type: 'calcium_list',
      message0: '[',
      output: 'Array',
      colour: 75,
      tooltip: '%{BKY_CALCIUM_LIST_TOOLTIP}',
      helpUrl: '',
    })
    this.itemCount_ = 0
    this.setInputsInline(true)
    this.updateShape_()
    this.setMutator(new Blockly.Mutator(['calcium_list_item']))
  },
  saveExtraState: function () {
    return {
      itemCount: this.itemCount_,
    }
  },

  loadExtraState: function (state) {
    this.itemCount_ = state['itemCount']
    // This is a helper function which adds or removes inputs from the block.
    this.updateShape_()
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this {Blockly.Block}
   */
  decompose: function (workspace) {
    var containerBlock = workspace.newBlock('calcium_list_item_container')
    containerBlock.initSvg()
    var connection = containerBlock.getInput('STACK').connection
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('calcium_list_item')
      itemBlock.initSvg()
      connection.connect(itemBlock.previousConnection)
      connection = itemBlock.nextConnection
    }
    return containerBlock
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  compose: function (containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK')
    // Count number of inputs.
    var connections = []
    while (itemBlock && !itemBlock.isInsertionMarker()) {
      connections.push(itemBlock.valueConnection_)
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ADD' + i).connection.targetConnection
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect()
      }
    }
    this.itemCount_ = connections.length
    this.updateShape_()
    // Reconnect any child blocks.
    for (i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i)
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  saveConnections: function (containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK')
    var i = 0
    while (itemBlock) {
      var input = this.getInput('ADD' + i)
      itemBlock.valueConnection_ = input && input.connection.targetConnection
      i++
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this {Blockly.Block}
   */
  updateShape_: function () {
    if (this.getInput(']')) {
      this.removeInput(']')
    }
    let i
    // Add new inputs.
    for (i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        const input = this.appendValueInput('ADD' + i)
        input.init()
        if (i !== 0) {
          input.appendField(',')
        }
      }
    }
    this.appendDummyInput(']').appendField(']')
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i)
      i++
    }
  },
}

Blockly.Blocks['calcium_call_repr'] = {
  init() {
    this.jsonInit({
      type: 'calcium_call_repr',
      message0: '%{BKY_CALCIUM_CALL_TITLE}',
      args0: [
        {
          type: 'input_value',
          name: 'REF',
          check: [
            'calcium_function',
            'calcium_class',
            'calcium_method',
            'calcium_variable',
            'calcium_attribute',
          ],
        },
      ],
      output: 'calcium_call',
      colour: 120,
      tooltip: '%{BKY_CALCIUM_CALL_TOOLTIP}',
      helpUrl: '',
    })
    this.countOfArguments = 0
    this.updateShape()
    this.setMutator(new Blockly.Mutator(['calcium_call_arg']))
  },
  compose(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('ARGS')
    const connections = []
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_)
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
    }
    for (let i = 0; i < this.countOfArguments; ++i) {
      const connection = this.getInput('ARG' + i).connection.targetConnection
      if (connection && connections.indexOf(connection) === -1) {
        connection.disconnect()
      }
    }
    this.countOfArguments = connections.length
    this.updateShape()
    for (let i = 0; i < this.countOfArguments; ++i) {
      Blockly.Mutator.reconnect(connections[i], this, 'ARG' + i)
    }
  },
  decompose(workspace) {
    const containerBlock = workspace.newBlock('calcium_call_arg_container')
    containerBlock.initSvg()
    let connection = containerBlock.getInput('ARGS').connection
    for (let i = 0; i < this.countOfArguments; ++i) {
      const itemBlock = workspace.newBlock('calcium_call_arg')
      itemBlock.initSvg()
      connection.connect(itemBlock.previousConnection)
      connection = itemBlock.nextConnection
    }
    return containerBlock
  },
  saveExtraState: function () {
    return {
      countOfArguments: this.countOfArguments,
    }
  },

  loadExtraState: function (state) {
    this.countOfArguments = state['countOfArguments']
    this.updateShape()
  },
  saveConnections: function (containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('ARGS')
    let i = 0
    while (itemBlock) {
      const input = this.getInput('ARG' + i)
      itemBlock.valueConnection_ = input && input.connection.targetConnection
      ++i
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
    }
  },
  updateShape() {
    let i
    for (i = 0; i < this.countOfArguments; ++i) {
      if (!this.getInput('ARG' + i)) {
        const input = this.appendValueInput('ARG' + i)
        input.init()
        if (i === 0) {
          input.appendField(Blockly.Msg.CALCIUM_CALL_ARG_TITLE)
        }
      }
    }
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i)
      ++i
    }
  },
}

Blockly.Blocks['calcium_callnoreturn_repr'] = {
  init() {
    this.jsonInit({
      type: 'calcium_callnoreturn_repr',
      message0: '%{BKY_CALCIUM_CALL_TITLE}',
      args0: [
        {
          type: 'input_value',
          name: 'REF',
          check: [
            'calcium_function',
            'calcium_method',
            'calcium_variable',
            'calcium_attribute',
          ],
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 240,
      tooltip: '%{BKY_CALCIUM_CALL_TOOLTIP}',
      helpUrl: '',
    })
    this.countOfArguments = 0
    this.updateShape()
    this.setMutator(new Blockly.Mutator(['calcium_call_arg']))
  },
  compose(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('ARGS')
    const connections = []
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_)
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
    }
    for (let i = 0; i < this.countOfArguments; ++i) {
      const connection = this.getInput('ARG' + i).connection.targetConnection
      if (connection && connections.indexOf(connection) === -1) {
        connection.disconnect()
      }
    }
    this.countOfArguments = connections.length
    this.updateShape()
    for (let i = 0; i < this.countOfArguments; ++i) {
      Blockly.Mutator.reconnect(connections[i], this, 'ARG' + i)
    }
  },
  decompose(workspace) {
    const containerBlock = workspace.newBlock('calcium_call_arg_container')
    containerBlock.initSvg()
    let connection = containerBlock.getInput('ARGS').connection
    for (let i = 0; i < this.countOfArguments; ++i) {
      const itemBlock = workspace.newBlock('calcium_call_arg')
      itemBlock.initSvg()
      connection.connect(itemBlock.previousConnection)
      connection = itemBlock.nextConnection
    }
    return containerBlock
  },
  saveExtraState: function () {
    return {
      countOfArguments: this.countOfArguments,
    }
  },
  loadExtraState: function (state) {
    this.countOfArguments = state['countOfArguments']
    this.updateShape()
  },
  saveConnections: function (containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('ARGS')
    let i = 0
    while (itemBlock) {
      const input = this.getInput('ARG' + i)
      itemBlock.valueConnection_ = input && input.connection.targetConnection
      ++i
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
    }
  },
  updateShape() {
    let i
    for (i = 0; i < this.countOfArguments; ++i) {
      if (!this.getInput('ARG' + i)) {
        const input = this.appendValueInput('ARG' + i)
        input.init()
        if (i === 0) {
          input.appendField(Blockly.Msg.CALCIUM_CALL_ARG_TITLE)
        }
      }
    }
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i)
      ++i
    }
  },
}

Blockly.Blocks['calcium_callreturn_repr'] = {
  init: function () {
    this.jsonInit({
      type: 'calcium_callreturn_repr',
      message0: '%{BKY_CALCIUM_CALL_RETURN_TITLE}',
      args0: [
        {
          type: 'input_value',
          name: 'RETURN',
          check: [
            'calcium_variable',
            'calcium_attribute',
            'calcium_subscript',
            'calcium_comma',
          ],
        },
        {
          type: 'input_value',
          name: 'REF',
          check: [
            'calcium_function',
            'calcium_method',
            'calcium_class',
            'calcium_variable',
            'calcium_attribute',
          ],
        },
      ],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      colour: 240,
      tooltip: '%{BKY_CALCIUM_CALL_RETURN_TOOLTIP}',
      helpUrl: '',
    })
    this.countOfArguments = 0
    this.updateShape()
    this.setMutator(new Blockly.Mutator(['calcium_call_arg']))
  },
  compose: Blockly.Blocks['calcium_callnoreturn_repr'].compose,
  decompose: Blockly.Blocks['calcium_callnoreturn_repr'].decompose,
  loadExtraState: Blockly.Blocks['calcium_callnoreturn_repr'].loadExtraState,
  saveExtraState: Blockly.Blocks['calcium_callnoreturn_repr'].saveExtraState,
  saveConnections: Blockly.Blocks['calcium_callnoreturn_repr'].saveConnections,
  updateShape: Blockly.Blocks['calcium_callnoreturn_repr'].updateShape,
}

Blockly.Blocks['calcium_def_repr'] = {
  init() {
    this.jsonInit({
      type: 'calcium_def_repr',
      message0: '%{BKY_CALCIUM_DEF_TITLE}',
      args0: [
        {
          type: 'field_input',
          name: 'NAME',
          text: 'f',
        },
        {
          type: 'field_label_serializable',
          name: 'LABELS',
          text: '',
        },
        {
          type: 'input_dummy',
        },
        {
          type: 'input_statement',
          name: 'STMTS',
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 240,
      tooltip: '%{BKY_CALCIUM_DEF_TOOLTIP}',
      helpUrl: '',
    })
    this.countOfParameters = 0
    this.updateShape()
    this.setMutator(new Blockly.Mutator(['calcium_def_param']))
  },
  compose(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('PARAMS')
    const connections = []
    this.parameters = []
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_)
      this.parameters.push(itemBlock.getFieldValue('PARAM'))
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
    }
    this.countOfParameters = connections.length
    this.updateShape()
  },
  decompose(workspace) {
    const containerBlock = workspace.newBlock('calcium_def_param_container')
    containerBlock.initSvg()
    let connection = containerBlock.getInput('PARAMS').connection
    for (let i = 0; i < this.countOfParameters; ++i) {
      const itemBlock = workspace.newBlock('calcium_def_param')
      itemBlock.initSvg()
      itemBlock.setFieldValue(this.parameters[i], 'PARAM')
      connection.connect(itemBlock.previousConnection)
      connection = itemBlock.nextConnection
    }
    return containerBlock
  },
  saveExtraState() {
    return {
      countOfParameters: this.countOfParameters,
      parameters: this.parameters,
    }
  },
  loadExtraState(state) {
    this.countOfParameters = state['countOfParameters']
    this.parameters = state['parameters']
    this.updateShape()
  },
  updateShape() {
    if (this.parameters) {
      let labelStr = ''
      if (this.countOfParameters > 0) {
        labelStr = `(${this.parameters.join(', ')}):`
      }
      Blockly.Events.disable()
      try {
        this.setFieldValue(labelStr, 'LABELS')
      } finally {
        Blockly.Events.enable()
      }
    }
  },
}

Blockly.Blocks['calcium_defmethod_repr'] = {
  init() {
    this.jsonInit({
      type: 'calcium_defmethod_repr',
      message0: '%{BKY_CALCIUM_DEF_METHOD_TITLE}',
      args0: [
        {
          type: 'field_input',
          name: 'NAME',
          text: '__init__',
        },
        {
          type: 'field_label_serializable',
          name: 'LABELS',
          text: '',
        },
        {
          type: 'input_dummy',
        },
        {
          type: 'input_statement',
          name: 'STMTS',
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 240,
      tooltip: '%{BKY_CALCIUM_DEF_METHOD_TOOLTIP}',
      helpUrl: '',
    })
    this.countOfParameters = 0
    this.updateShape()
    this.setMutator(new Blockly.Mutator(['calcium_def_param']))
  },
  compose: Blockly.Blocks['calcium_def_repr'].compose,
  decompose: Blockly.Blocks['calcium_def_repr'].decompose,
  loadExtraState: Blockly.Blocks['calcium_def_repr'].loadExtraState,
  saveExtraState: Blockly.Blocks['calcium_def_repr'].saveExtraState,
  saveConnections: Blockly.Blocks['calcium_def_repr'].saveConnections,
  updateShape() {
    let labelStr = ''
    if (this.countOfParameters > 0) {
      if (this.parameters) {
        labelStr = `(self, ${this.parameters.join(', ')}):`
      }
    } else {
      labelStr = `(self):`
    }
    Blockly.Events.disable()
    try {
      this.setFieldValue(labelStr, 'LABELS')
    } finally {
      Blockly.Events.enable()
    }
  },
}

Blockly.Blocks['calcium_print_repr'] = {
  init() {
    this.jsonInit({
      type: 'calcium_print_repr',
      message0: '%{BKY_CALCIUM_PRINT_TITLE}',
      args0: [
        {
          type: 'input_value',
          name: 'VALUE',
        },
      ],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      colour: 240,
      tooltip: '%{BKY_CALCIUM_PRINT_TOOLTIP}',
      helpUrl: '',
    })
    this.countOfParameters = 0
    this.updateShape()
    this.setMutator(new Blockly.Mutator(['calcium_call_arg']))
  },
  compose(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('ARGS')
    const connections = []
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_)
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
    }
    for (let i = 0; i < this.countOfArguments; ++i) {
      const connection = this.getInput('ARG' + i).connection.targetConnection
      if (connection && connections.indexOf(connection) === -1) {
        connection.disconnect()
      }
    }
    this.countOfArguments = connections.length
    this.updateShape()
    for (let i = 0; i < this.countOfArguments; ++i) {
      Blockly.Mutator.reconnect(connections[i], this, 'ARG' + i)
    }
  },
  decompose(workspace) {
    const containerBlock = workspace.newBlock('calcium_call_arg_container')
    containerBlock.initSvg()
    let connection = containerBlock.getInput('ARGS').connection
    for (let i = 0; i < this.countOfArguments; ++i) {
      const itemBlock = workspace.newBlock('calcium_call_arg')
      itemBlock.initSvg()
      connection.connect(itemBlock.previousConnection)
      connection = itemBlock.nextConnection
    }
    return containerBlock
  },
  saveExtraState: function () {
    return {
      countOfArguments: this.countOfArguments,
    }
  },

  loadExtraState: function (state) {
    this.countOfArguments = state['countOfArguments']
    this.updateShape()
  },
  saveConnections: function (containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('ARGS')
    let i = 0
    while (itemBlock) {
      const input = this.getInput('ARG' + i)
      itemBlock.valueConnection_ = input && input.connection.targetConnection
      ++i
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
    }
  },
  updateShape() {
    let i
    for (i = 0; i < this.countOfArguments; ++i) {
      if (!this.getInput('ARG' + i)) {
        this.appendValueInput('ARG' + i)
      }
    }
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i)
      ++i
    }
  },
}

Blockly.defineBlocksWithJsonArray([
  {
    type: 'calcium_if_if',
    message0: 'if',
    nextStatement: null,
    enableContextMenu: false,
    colour: 270,
    tooltip: '%{BKY_CALCIUM_IF_IF_TOOLTIP}',
  },
  {
    type: 'calcium_if_elseif',
    message0: 'elif',
    previousStatement: null,
    nextStatement: null,
    enableContextMenu: false,
    colour: 270,
    tooltip: '%{BKY_CALCIUM_IF_ELSEIF_TOOLTIP}',
  },
  {
    type: 'calcium_if_else',
    message0: 'else',
    previousStatement: null,
    enableContextMenu: false,
    colour: 270,
    tooltip: '%{BKY_CALCIUM_IF_ELSE_TOOLTIP}',
  },
])

Blockly.defineBlocksWithJsonArray([
  {
    type: 'calcium_if_if_repr',
    message0: '%{BKY_CALCIUM_IF_IF_TITLE}',
    nextStatement: null,
    enableContextMenu: false,
    colour: 240,
    tooltip: '%{BKY_CALCIUM_IF_IF_TOOLTIP}',
  },
  {
    type: 'calcium_if_elseif_repr',
    message0: '%{BKY_CALCIUM_IF_ELSEIF_TITLE}',
    previousStatement: null,
    nextStatement: null,
    enableContextMenu: false,
    colour: 240,
    tooltip: '%{BKY_CALCIUM_IF_ELSEIF_TOOLTIP}',
  },
  {
    type: 'calcium_if_else_repr',
    message0: '%{BKY_CALCIUM_IF_ELSE_TITLE}',
    previousStatement: null,
    enableContextMenu: false,
    colour: 240,
    tooltip: '%{BKY_CALCIUM_IF_ELSE_TOOLTIP}',
  },
])

Blockly.Blocks['calcium_if_repr'] = {
  init: function () {
    this.jsonInit(
      // Block for if/elseif/else condition.
      {
        type: 'calcium_if_repr',
        message0: '%{BKY_CALCIUM_IF_TITLE}',
        args0: [
          {
            type: 'input_value',
            name: 'IF0',
            check: [
              'Boolean',
              'calcium_variable',
              'calcium_attribute',
              'calcium_subscript',
              'calcium_call',
              'calcium_arithmetic',
            ],
          },
        ],
        message1: '%1',
        args1: [
          {
            type: 'input_statement',
            name: 'DO0',
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 240,
        tooltip: '%{BKY_CALCIUM_IF_TOOLTIP}',
        helpUrl: '',
      }
    )
    this.setMutator(
      new Blockly.Mutator(['calcium_if_elseif_repr', 'calcium_if_else_repr'])
    )
  },
  elseifCount_: 0,
  elseCount_: 0,

  /**
   * Don't automatically add STATEMENT_PREFIX and STATEMENT_SUFFIX to generated
   * code.  These will be handled manually in this block's generators.
   */
  suppressPrefixSuffix: true,

  saveExtraState() {
    return {
      elseifCount: this.elseifCount_,
      elseCount: this.elseCount_,
    }
  },
  loadExtraState(state) {
    this.elseifCount_ = state['elseifCount']
    this.elseCount_ = state['elseCount']
    this.rebuildShape_()
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this {Blockly.Block}
   */
  decompose: function (workspace) {
    var containerBlock = workspace.newBlock('calcium_if_if_repr')
    containerBlock.initSvg()
    var connection = containerBlock.nextConnection
    for (var i = 1; i <= this.elseifCount_; i++) {
      var elseifBlock = workspace.newBlock('calcium_if_elseif_repr')
      elseifBlock.initSvg()
      connection.connect(elseifBlock.previousConnection)
      connection = elseifBlock.nextConnection
    }
    if (this.elseCount_) {
      var elseBlock = workspace.newBlock('calcium_if_else_repr')
      elseBlock.initSvg()
      connection.connect(elseBlock.previousConnection)
    }
    return containerBlock
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  compose: function (containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock()
    // Count number of inputs.
    this.elseifCount_ = 0
    this.elseCount_ = 0
    var valueConnections = [null]
    var statementConnections = [null]
    var elseStatementConnection = null
    while (clauseBlock && !clauseBlock.isInsertionMarker()) {
      switch (clauseBlock.type) {
        case 'calcium_if_elseif_repr':
          this.elseifCount_++
          valueConnections.push(clauseBlock.valueConnection_)
          statementConnections.push(clauseBlock.statementConnection_)
          break
        case 'calcium_if_else_repr':
          this.elseCount_++
          elseStatementConnection = clauseBlock.statementConnection_
          break
        default:
          throw TypeError('Unknown block type: ' + clauseBlock.type)
      }
      clauseBlock =
        clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock()
    }
    this.updateShape_()
    // Reconnect any child blocks.
    this.reconnectChildBlocks_(
      valueConnections,
      statementConnections,
      elseStatementConnection
    )
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  saveConnections: function (containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock()
    var i = 1
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'calcium_if_elseif_repr':
          var inputIf = this.getInput('IF' + i)
          var inputDo = this.getInput('DO' + i)
          clauseBlock.valueConnection_ =
            inputIf && inputIf.connection.targetConnection
          clauseBlock.statementConnection_ =
            inputDo && inputDo.connection.targetConnection
          i++
          break
        case 'calcium_if_else_repr':
          var inputDo2 = this.getInput('ELSE')
          clauseBlock.statementConnection_ =
            inputDo2 && inputDo2.connection.targetConnection
          break
        default:
          throw TypeError('Unknown block type: ' + clauseBlock.type)
      }
      clauseBlock =
        clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock()
    }
  },
  /**
   * Reconstructs the block with all child blocks attached.
   * @this {Blockly.Block}
   */
  rebuildShape_: function () {
    var valueConnections = [null]
    var statementConnections = [null]
    var elseStatementConnection = null

    if (this.getInput('ELSE')) {
      elseStatementConnection =
        this.getInput('ELSE').connection.targetConnection
    }
    var i = 1
    while (this.getInput('IF' + i)) {
      var inputIf = this.getInput('IF' + i)
      var inputDo = this.getInput('DO' + i)
      valueConnections.push(inputIf.connection.targetConnection)
      statementConnections.push(inputDo.connection.targetConnection)
      i++
    }
    this.updateShape_()
    this.reconnectChildBlocks_(
      valueConnections,
      statementConnections,
      elseStatementConnection
    )
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @this {Blockly.Block}
   * @private
   */
  updateShape_: function () {
    // Delete everything.
    if (this.getInput('ELSE')) {
      this.removeInput('ELSE')
    }
    var i = 1
    while (this.getInput('IF' + i)) {
      this.removeInput('IF' + i)
      this.removeInput('DO' + i)
      i++
    }
    // Rebuild block.
    for (i = 1; i <= this.elseifCount_; i++) {
      this.appendValueInput('IF' + i)
        .setCheck('Boolean')
        .appendField(Blockly.Msg.CALCIUM_IF_ELSEIF_TITLE)
      this.appendStatementInput('DO' + i).appendField('')
    }
    if (this.elseCount_) {
      this.appendStatementInput('ELSE').appendField(
        Blockly.Msg.CALCIUM_IF_ELSE_TITLE
      )
    }
  },
  /**
   * Reconnects child blocks.
   * @param {!Array.<?Blockly.RenderedConnection>} valueConnections List of
   * value connections for 'if' input.
   * @param {!Array.<?Blockly.RenderedConnection>} statementConnections List of
   * statement connections for 'do' input.
   * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
   * connection for else input.
   * @this {Blockly.Block}
   */
  reconnectChildBlocks_: function (
    valueConnections,
    statementConnections,
    elseStatementConnection
  ) {
    for (var i = 1; i <= this.elseifCount_; i++) {
      Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i)
      Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i)
    }
    Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE')
  },
}

Blockly.Blocks['calcium_list_repr'] = {
  init: function () {
    this.jsonInit({
      type: 'calcium_list_repr',
      message0: '%{BKY_CALCIUM_LIST_TITLE}',
      output: 'Array',
      colour: 120,
      tooltip: '%{BKY_CALCIUM_LIST_TOOLTIP}',
      helpUrl: '',
    })
    this.itemCount_ = 0
    this.updateShape_()
    this.setMutator(new Blockly.Mutator(['calcium_list_item']))
  },
  saveExtraState: function () {
    return {
      itemCount: this.itemCount_,
    }
  },

  loadExtraState: function (state) {
    this.itemCount_ = state['itemCount']
    // This is a helper function which adds or removes inputs from the block.
    this.updateShape_()
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this {Blockly.Block}
   */
  decompose: function (workspace) {
    var containerBlock = workspace.newBlock('calcium_list_item_container')
    containerBlock.initSvg()
    var connection = containerBlock.getInput('STACK').connection
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('calcium_list_item')
      itemBlock.initSvg()
      connection.connect(itemBlock.previousConnection)
      connection = itemBlock.nextConnection
    }
    return containerBlock
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  compose: function (containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK')
    // Count number of inputs.
    var connections = []
    while (itemBlock && !itemBlock.isInsertionMarker()) {
      connections.push(itemBlock.valueConnection_)
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ADD' + i).connection.targetConnection
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect()
      }
    }
    this.itemCount_ = connections.length
    this.updateShape_()
    // Reconnect any child blocks.
    for (i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i)
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  saveConnections: function (containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK')
    var i = 0
    while (itemBlock) {
      var input = this.getInput('ADD' + i)
      itemBlock.valueConnection_ = input && input.connection.targetConnection
      i++
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this {Blockly.Block}
   */
  updateShape_: function () {
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        this.appendValueInput('ADD' + i)
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i)
      i++
    }
  },
}

Blockly.Blocks['calcium_number'] = {
  init() {
    this.appendDummyInput().appendField(
      new Blockly.FieldTextInput('0', function (newValue) {
        try {
          const parsedNum = parseFullWidthNumber(newValue)
          return parsedNum
        } catch {
          return null
        }
      }),
      'NUM'
    )
    this.setInputsInline(true)
    this.setOutput(true, 'Number')
    this.setColour(120)
    this.setTooltip(Blockly.Msg.CALCIUM_NUMBER_TOOLTIP)
  },
}
