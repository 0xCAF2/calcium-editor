import { ConstantValues, tooltipManager } from "../../constant-manager"

const CALCIUM_ARITHMETIC_TOOLTIP =
  "Perform arithmetic operations or string concatenation on numbers and strings."
const CALCIUM_ASSIGNMENT_TOOLTIP = "Assign a value to a variable."
const CALCIUM_ATTRIBUTE_TOOLTIP = "Access an attribute of an object."
const CALCIUM_BOOLEAN_TOOLTIP = "Represents a boolean value."
const CALCIUM_BREAK_CONTINUE_TOOLTIP =
  "Exit the loop or skip to the next iteration."
const CALCIUM_CALL_ARG_CONTAINER_TOOLTIP = "Create arguments."
const CALCIUM_CALL_ARG_TOOLTIP = "Add an argument to a function."
const CALCIUM_CALL_TOOLTIP = "Call a function or method."
const CALCIUM_CLASS_TOOLTIP = "Define a class."
const CALCIUM_COMMA_TOOLTIP = "Expand multiple elements."
const CALCIUM_COMPOUND_ASSIGNMENT_TOOLTIP =
  "Assign a computed value to a variable."
const CALCIUM_DEF_TOOLTIP = "Define a function."
const CALCIUM_DEF_METHOD_TOOLTIP = "Define a method."
const CALCIUM_DEF_PARAM_TOOLTIP =
  "A parameter that a function or method accepts."
const CALCIUM_DICT_TOOLTIP = "Create a dictionary."
const CALCIUM_EXPR_STMT_TOOLTIP = "Use a function call expression."
const CALCIUM_FOR_TOOLTIP = "Iterate over elements of a list or dictionary."
const CALCIUM_IF_TOOLTIP = "Block executed when the condition is true."
const CALCIUM_IF_CONTAINER_TOOLTIP =
  "Block executed when the condition is true."
const CALCIUM_IF_ELIF_TOOLTIP =
  "Block executed when the previous condition is false and the current condition is true."
const CALCIUM_IF_ELSE_TOOLTIP =
  "Block executed last when all conditions are false."
const CALCIUM_IMPORT_TOOLTIP = "Make a Python module available for use."
const CALCIUM_KWARG_TOOLTIP = "A keyword argument passed to a function."
const CALCIUM_LIST_TOOLTIP = "Create a list."
const CALCIUM_LIST_ITEM_TOOLTIP = "Add an item to the list."
const CALCIUM_LOGICAL_TOOLTIP = "Perform a logical operation."
const CALCIUM_NONE_TOOLTIP = "Represents the absence of a value."
const CALCIUM_NOT_TOOLTIP = "Represents negation."
const CALCIUM_NUMBER_TOOLTIP = "Represents a number."
const CALCIUM_PRINT_ARG_TOOLTIP = "Add a value to print."
const CALCIUM_PRINT_TOOLTIP = "Display the specified values."
const CALCIUM_RELATIONAL_TOOLTIP = "Compare values."
const CALCIUM_RETURN_TOOLTIP = "Exit a function."
const CALCIUM_SLICE_TOOLTIP = "Extract a portion of a list or string."
const CALCIUM_STR_TOOLTIP = "Represents a string."
const CALCIUM_SUBSCRIPT_TOOLTIP = "Access an element of a list or dictionary."
const CALCIUM_VARIABLE_TOOLTIP = "Represents a variable name."
const CALCIUM_WHILE_TOOLTIP = "Repeat while the condition is true."

const tooltips: ConstantValues = {
  CALCIUM_ARITHMETIC_TOOLTIP,
  CALCIUM_ASSIGNMENT_TOOLTIP,
  CALCIUM_ATTRIBUTE_TOOLTIP,
  CALCIUM_BOOLEAN_TOOLTIP,
  CALCIUM_BREAK_CONTINUE_TOOLTIP,
  CALCIUM_CALL_ARG_CONTAINER_TOOLTIP,
  CALCIUM_CALL_ARG_TOOLTIP,
  CALCIUM_CALL_TOOLTIP,
  CALCIUM_CLASS_TOOLTIP,
  CALCIUM_COMMA_TOOLTIP,
  CALCIUM_COMPOUND_ASSIGNMENT_TOOLTIP,
  CALCIUM_DEF_TOOLTIP,
  CALCIUM_DEF_METHOD_TOOLTIP,
  CALCIUM_DEF_PARAM_TOOLTIP,
  CALCIUM_DICT_TOOLTIP,
  CALCIUM_EXPR_STMT_TOOLTIP,
  CALCIUM_FOR_TOOLTIP,
  CALCIUM_IF_TOOLTIP,
  CALCIUM_IF_CONTAINER_TOOLTIP,
  CALCIUM_IF_ELIF_TOOLTIP,
  CALCIUM_IF_ELSE_TOOLTIP,
  CALCIUM_IMPORT_TOOLTIP,
  CALCIUM_KWARG_TOOLTIP,
  CALCIUM_LIST_TOOLTIP,
  CALCIUM_LIST_ITEM_TOOLTIP,
  CALCIUM_LOGICAL_TOOLTIP,
  CALCIUM_NONE_TOOLTIP,
  CALCIUM_NOT_TOOLTIP,
  CALCIUM_NUMBER_TOOLTIP,
  CALCIUM_PRINT_ARG_TOOLTIP,
  CALCIUM_PRINT_TOOLTIP,
  CALCIUM_RELATIONAL_TOOLTIP,
  CALCIUM_RETURN_TOOLTIP,
  CALCIUM_SLICE_TOOLTIP,
  CALCIUM_STR_TOOLTIP,
  CALCIUM_SUBSCRIPT_TOOLTIP,
  CALCIUM_VARIABLE_TOOLTIP,
  CALCIUM_WHILE_TOOLTIP,
}

tooltipManager.addValues(tooltips)
