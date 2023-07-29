export const calciumToolbox = [
  {
    kind: 'category',
    name: '基本',
    contents: [
      {
        kind: 'block',
        type: 'pseudo_variable',
      },
      {
        kind: 'block',
        type: 'pseudo_number',
      },
      {
        kind: 'block',
        type: 'pseudo_str',
      },
      {
        kind: 'block',
        type: 'pseudo_array',
      },
      {
        kind: 'block',
        type: 'pseudo_array_slice',
      },
    ],
  },
  {
    kind: 'category',
    name: '代入',
    contents: [
      {
        kind: 'block',
        type: 'pseudo_assign',
      },
      {
        kind: 'block',
        type: 'pseudo_assign_array',
      },
      {
        kind: 'block',
        type: 'pseudo_assign_zero',
      },
      {
        kind: 'block',
        type: 'pseudo_int_input',
      },
      {
        kind: 'block',
        type: 'pseudo_str_input',
      },
    ],
  },
  {
    kind: 'category',
    name: '演算',
    contents: [
      {
        kind: 'block',
        type: 'pseudo_arithmetic',
      },
      {
        kind: 'block',
        type: 'pseudo_relational',
      },
      {
        kind: 'block',
        type: 'pseudo_logical',
      },
      {
        kind: 'block',
        type: 'pseudo_not',
      },
    ],
  },
  {
    kind: 'category',
    name: '条件分岐',
    contents: [
      {
        kind: 'block',
        type: 'pseudo_if',
      },
    ],
  },
  {
    kind: 'category',
    name: '繰り返し',
    contents: [
      {
        kind: 'block',
        type: 'pseudo_for_increment',
      },
      {
        kind: 'block',
        type: 'pseudo_for_decrement',
      },
      {
        kind: 'block',
        type: 'pseudo_while',
      },
    ],
  },
  {
    kind: 'category',
    name: '関数',
    contents: [
      {
        kind: 'block',
        type: 'pseudo_len',
      },
      {
        kind: 'block',
        type: 'pseudo_int',
      },
      {
        kind: 'block',
        type: 'pseudo_random',
      },
      {
        kind: 'block',
        type: 'pseudo_print',
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
        type: 'calcium_def_method',
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
