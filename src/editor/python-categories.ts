import * as Blockly from "blockly"
import "../block/calcium"

export const pythonCategories: Blockly.utils.toolbox.ToolboxItemInfo[] = [
  {
    kind: "category",
    name: "Python A",
    contents: [
      {
        kind: "block",
        type: "calcium_variable",
        fields: {
          NAME: "self",
        },
      },
      {
        kind: "block",
        type: "calcium_str",
        fields: {
          STR: "Hello, World.",
        },
      },
      {
        kind: "block",
        type: "calcium_number",
        fields: {
          NUM: "0",
        },
      },
      {
        kind: "block",
        type: "calcium_list",
      },
      {
        kind: "block",
        type: "calcium_dict",
      },
      {
        kind: "block",
        type: "calcium_attribute",
        inputs: {
          REF: {
            shadow: {
              type: "calcium_variable",
              fields: {
                NAME: "self",
              },
            },
          },
        },
      },
      {
        kind: "block",
        type: "calcium_call",
        inputs: {
          REF: {
            shadow: {
              type: "calcium_variable",
              fields: {
                NAME: "",
              },
            },
          },
        },
      },
      {
        kind: "block",
        type: "calcium_subscript",
        inputs: {
          REF: {
            shadow: {
              type: "calcium_variable",
              fields: {
                NAME: "my_list",
              },
            },
          },
          SUB: {
            shadow: {
              type: "calcium_number",
              fields: {
                NUM: "0",
              },
            },
          },
        },
      },
      {
        kind: "block",
        type: "calcium_arithmetic",
        inputs: {
          LEFT: {
            shadow: {
              type: "calcium_variable",
              fields: {
                NAME: "i",
              },
            },
          },
          RIGHT: {
            shadow: {
              type: "calcium_number",
              fields: {
                NUM: "1",
              },
            },
          },
        },
      },
      {
        kind: "block",
        type: "calcium_boolean",
      },
      {
        kind: "block",
        type: "calcium_relational",
        fields: {
          OP: "==",
        },
        inputs: {
          LEFT: {
            shadow: {
              type: "calcium_variable",
              fields: {
                NAME: "i",
              },
            },
          },
          RIGHT: {
            shadow: {
              type: "calcium_number",
              fields: {
                NUM: "0",
              },
            },
          },
        },
      },
      {
        kind: "block",
        type: "calcium_logical",
      },
      {
        kind: "block",
        type: "calcium_not",
        inputs: {
          VALUE: {
            shadow: {
              type: "calcium_variable",
              fields: {
                NAME: "value",
              },
            },
          },
        },
      },
      {
        kind: "block",
        type: "calcium_kwarg",
        inputs: {
          VALUE: {
            shadow: {
              type: "calcium_str",
              fields: {
                STR: "",
              },
            },
          },
        },
      },
      {
        kind: "block",
        type: "calcium_slice",
        inputs: {
          START: {
            shadow: {
              type: "calcium_number",
              fields: {
                NUM: "0",
              },
            },
          },
          STOP: {
            shadow: {
              type: "calcium_number",
              fields: {
                NUM: "10",
              },
            },
          },
        },
      },
      {
        kind: "block",
        type: "calcium_comma",
        inputs: {
          FIRST: {
            shadow: {
              type: "calcium_variable",
              fields: {
                NAME: "a",
              },
            },
          },
          SECOND: {
            shadow: {
              type: "calcium_variable",
              fields: {
                NAME: "b",
              },
            },
          },
        },
      },
      {
        kind: "block",
        type: "calcium_none",
      },
    ],
  },
  {
    kind: "category",
    name: "Python B",
    contents: [
      {
        kind: "block",
        type: "calcium_print",
        inputs: {
          ARG0: {
            shadow: {
              type: "calcium_variable",
              fields: {
                NAME: "i",
              },
            },
          },
        },
      },
      {
        kind: "block",
        type: "calcium_assignment",
        inputs: {
          REF: {
            shadow: {
              type: "calcium_variable",
              fields: {
                NAME: "i",
              },
            },
          },
          VALUE: {
            shadow: {
              type: "calcium_number",
              fields: {
                NUM: "0",
              },
            },
          },
        },
      },
      {
        kind: "block",
        type: "calcium_compound_assignment",
        fields: {
          OP: "+=",
        },
        inputs: {
          REF: {
            shadow: {
              type: "calcium_variable",
              fields: {
                NAME: "i",
              },
            },
          },
          VALUE: {
            shadow: {
              type: "calcium_number",
              fields: {
                NUM: "1",
              },
            },
          },
        },
      },
      {
        kind: "block",
        type: "calcium_expr_stmt",
      },
      {
        kind: "block",
        type: "calcium_if",
        inputs: {
          IF0: {
            shadow: {
              type: "calcium_relational",
              inputs: {
                LEFT: {
                  shadow: {
                    type: "calcium_variable",
                    fields: {
                      NAME: "i",
                    },
                  },
                },
                RIGHT: {
                  shadow: {
                    type: "calcium_number",
                    fields: {
                      NUM: "0",
                    },
                  },
                },
              },
            },
          },
        },
      },
      {
        kind: "block",
        type: "calcium_for",
        inputs: {
          VARS: {
            shadow: {
              type: "calcium_variable",
              fields: {
                NAME: "i",
              },
            },
          },
        },
      },
      {
        kind: "block",
        type: "calcium_while",
      },
      {
        kind: "block",
        type: "calcium_break_continue",
      },
      {
        kind: "block",
        type: "calcium_return",
      },
      {
        kind: "block",
        type: "calcium_def",
      },
      {
        kind: "block",
        type: "calcium_def_method",
      },
      {
        kind: "block",
        type: "calcium_class",
      },
      {
        kind: "block",
        type: "calcium_import",
      },
    ],
  },
]
