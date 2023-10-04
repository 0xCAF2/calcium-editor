import json
from inspect import signature


class Runtime:
    def __init__(self, code_list):
        if isinstance(code_list, str):
            code_list = json.loads(code_list)
        self.env = Environment(code_list)
        self.breakpoints = set()
        self.parser = Parser()
        self._calls = []
        self._inputcmd = None

    def resume(self, inputstr):
        self.env.returned_value = inputstr
        cmd = self._inputcmd
        self._inputcmd = None
        try:
            cmd.execute(self.env)
            self.env.skip_to_next_line()
        except FunctionCalled:
            caller_addr = self.env.address.clone()
            self._calls.append(CallingCommand(caller_addr, cmd))
        except InputCalled:
            self._inputcmd = cmd
            return RESULT_PAUSED
        except:
            raise
        return RESULT_EXECUTED

    def run(self):
        while True:
            result = self.step()
            if result == RESULT_EXECUTED:
                continue
            else:
                return result

    def step(self):
        last_index = len(self.env.code) - 1
        if self.env.address.indent == 0:
            end_of_code = self.parser.read(self.env.code[last_index])
            if not isinstance(end_of_code, End):
                raise InvalidEnd()
            return RESULT_TERMINATED
        else:
            if self.env.address.line >= last_index:
                return RESULT_TERMINATED
            line = self.env.code[self.env.address.line]
            cmd = self.parser.read(line)

            caller_addr = self.env.address.clone()
            if len(self._calls) > 0 and caller_addr.is_at(self._calls[-1].address):
                lastcmd = self._calls.pop()
                cmd = lastcmd.command

            try:
                cmd.execute(self.env)
            except FunctionCalled:
                self._calls.append(CallingCommand(caller_addr, cmd))
            except InputCalled:
                self._inputcmd = cmd
                return RESULT_PAUSED
            except:
                raise

            if isinstance(cmd, End):
                return RESULT_TERMINATED

            self.env.skip_to_next_line()
            next_line = self.env.code[self.env.address.line]
            kw = next_line[INDEX_KEYWORD]
            while kw == KEYWORD_COMMENT or kw == KEYWORD_IFS:
                cmd = self.parser.read(next_line)
                cmd.execute(self.env)
                self.env.skip_to_next_line()
                next_line = self.env.code[self.env.address.line]
                kw = next_line[INDEX_KEYWORD]

            if self.env.address.line in self.breakpoints:
                return RESULT_BREAKPOINT
            else:
                return RESULT_EXECUTED


# Keyword
KEYWORD_ASSIGN = "="
KEYWORD_ADD = "+"
KEYWORD_SUBTRACT = "-"
KEYWORD_MULTIPLICATE = "*"
KEYWORD_EXPONENTIATE = "**"
KEYWORD_DIVIDE = "/"
KEYWORD_FLOOR_DIVIDE = "//"
KEYWORD_REMAIN = "%"

KEYWORD_COMPOUND_ADD = "+="
KEYWORD_COMPOUND_SUBTRACT = "-="
KEYWORD_COMPOUND_MULTIPLICATE = "*="

KEYWORD_EQUAL = "=="
KEYWORD_NOT_EQUAL = "!="
KEYWORD_LESS_THAN = "<"
KEYWORD_LESS_THAN_OR_EQUAL = "<="
KEYWORD_GREATER_THAN = ">"
KEYWORD_GREATER_THAN_OR_EQUAL = ">="
KEYWORD_AND = "and"
KEYWORD_OR = "or"
KEYWORD_IS = "is"
KEYWORD_IS_NOT = "is not"
KEYWORD_IN = "in"
KEYWORD_NOT_IN = "not in"

KEYWORD_BIT_AND = "&"
KEYWORD_BIT_OR = "|"
KEYWORD_BIT_XOR = "^"
KEYWORD_LEFT_SHIFT = "<<"
KEYWORD_RIGHT_SHIFT = ">>"

KEYWORD_NOT = "not"
KEYWORD_NEGATIVE = "-_"
KEYWORD_BIT_NOT = "~"

KEYWORD_IFS = "ifs"
KEYWORD_IF = "if"
KEYWORD_ELIF = "elif"
KEYWORD_ELSE = "else"

KEYWORD_FOR = "for"
KEYWORD_WHILE = "while"
KEYWORD_BREAK = "break"
KEYWORD_CONTINUE = "continue"

KEYWORD_DEF = "def"
KEYWORD_RETURN = "return"

KEYWORD_CLASS = "class"

KEYWORD_IMPORT = "import"

KEYWORD_EXPR_STMT = "expr"

KEYWORD_TRY = "try"
KEYWORD_EXCEPT = "except"
KEYWORD_RAISE = "raise"

KEYWORD_VAR = "var"
KEYWORD_ATTR = "attr"
KEYWORD_SUBSCRIPT = "sub"
KEYWORD_CALL = "call"

KEYWORD_COMMA = ","
KEYWORD_KWARG = "kwarg"
KEYWORD_TUPLE = "tuple"

KEYWORD_COMMENT = "#"
KEYWORD_PASS = "pass"
KEYWORD_END = "end"

# Index
INDEX_INDENT = 0
INDEX_OPTIONS = 1
INDEX_KEYWORD = 2

INDEX_ASSIGN_LHS = 3  # Left Hand Side
INDEX_ASSIGN_RHS = 4  # Right Hand Side

INDEX_CONDITION = 3

INDEX_FOR_VARIABLES = 3
INDEX_FOR_ITERABLE = 4

INDEX_DEF_NAME = 3
INDEX_DEF_PARAMETERS = 4

INDEX_RETURN_VALUE = 3

INDEX_CLASS_NAME = 3
INDEX_CLASS_SUPERCLASS = 4

INDEX_IMPORT_NAME = 3

INDEX_EXPR_STMT = 3

INDEX_EXCEPT_TYPE = 3
INDEX_EXCEPT_NAME = 4

INDEX_RAISE_EXCEPTION = 3

INDEX_EXPRESSION_KEYWORD = 0

INDEX_VAR_NAME = 1

INDEX_ATTR_OBJECT = 1
INDEX_ATTR_PROPERTIES = 2

INDEX_SUBSCRIPT_REFERENCE = 1
INDEX_SUBSCRIPT_INDEX = 2
INDEX_SUBSCRIPT_SLICE_START = 2
INDEX_SUBSCRIPT_SLICE_END = 3

INDEX_CALL_REFERENCE = 1
INDEX_CALL_ARGS = 2

INDEX_KWARG_KEYWORD = 1
INDEX_KWARG_VALUE = 2

INDEX_LEFT_OPERAND = 1
INDEX_RIGHT_OPERAND = 2

INDEX_UNARY_OPERAND = 1

# results of the runtime
RESULT_TERMINATED = 0
RESULT_EXECUTED = 1
RESULT_BREAKPOINT = 2
RESULT_EXCEPTION = 3
RESULT_PAUSED = 4

# results of the block
BLOCK_RESULT_JUMPPED = 0
BLOCK_RESULT_SHIFTED = 1


class Address:
    def __init__(self, indent, line, calls=0):
        self.indent = indent
        self.line = line
        self.calls = calls

    def clone(self):
        return Address(self.indent, self.line, self.calls)

    def is_at(self, addr):
        return (
            self.indent == addr.indent
            and self.line == addr.line
            and self.calls == addr.calls
        )

    def jump(self, addr):
        self.indent = addr.indent
        self.line = addr.line
        # calls is not affected

    def shift(self, delta_x, delta_y=0):
        self.indent += delta_x
        self.line += delta_y


# BlockKind
BLOCK_KIND_IFS = 0
BLOCK_KIND_IF_ELIF_ELSE = 1
BLOCK_KIND_FOR = 2
BLOCK_KIND_WHILE = 3
BLOCK_KIND_CALL = 4
BLOCK_KIND_CLASS_DEF = 5
BLOCK_KIND_TRY = 6
BLOCK_KIND_EXCEPT = 7


class Block:
    def __init__(self, kind, address, enter, exit):
        self.kind = kind
        self.address = address.clone()
        self.enter = enter
        self.exit = exit

    def will_enter(self, env):
        env.address = self.address.clone()
        if self.enter(env):
            env.address.shift(1)
            env.blocks.append(self)

    def did_exit(self, env):
        env.blocks.pop()
        return self.exit(env)


class CallingCommand:
    def __init__(self, address, command):
        self.address = address.clone()
        self.command = command


class Namespace:
    def __init__(self, parent, dictobj):
        self.parent = parent  # None is allowed
        self.dictobj = dictobj

    def register(self, name, obj):
        self.dictobj[name] = obj

    def lookup(self, name):
        try:
            return self.dictobj[name]
        except KeyError:
            if self.parent is None:
                raise NameError(name)
            return self.parent.lookup(name)

    def find_nesting_scope(self):
        scope = self
        while isinstance(scope, ClassScope):
            scope = scope.parent
        return scope


class ClassScope(Namespace):
    def create_attributes(self):
        return self.dictobj


class FuncScope(Namespace):
    pass


class GlobalScope(Namespace):
    def lookup(self, name):
        try:
            return super().lookup(name)
        except:
            try:
                if isinstance(__builtins__, dict):
                    return __builtins__[name]
                else:
                    return getattr(__builtins__, name)
            except KeyError:
                raise NameError(name)
            except:
                raise


class Variable:
    def __init__(self, name):
        self.name = name

    def assign(self, obj, env):
        env.context.register(self.name, obj)

    def evaluate(self, env):
        value = env.context.lookup(self.name)
        return value


class Attribute:
    def __init__(self, obj, properties):
        self.obj = obj
        self.properties = properties

    def assign(self, value, env):
        target = self._lookup(env)
        length = len(self.properties) - 1
        for i in range(length):
            target = getattr(target, self.properties[i])
        setattr(target, self.properties[length], value)

    def evaluate(self, env):
        target = self._lookup(env)
        for prop in self.properties:
            target = getattr(target, prop)
        return target

    def _lookup(self, env):
        if isinstance(self.obj, Variable) or isinstance(self.obj, Attribute):
            return self.obj.evaluate(env)
        else:
            return self.obj


class Subscript:
    def __init__(self, ref, index, start=None, end=None):
        self.ref = ref
        self.index = index
        self.start = start
        self.end = end

    def assign(self, value, env):
        obj = env.evaluate(self.ref)
        index = env.evaluate(self.index)
        start = env.evaluate(self.start)
        end = env.evaluate(self.end)
        if index is not None:
            obj[index] = value
        else:
            if start is None:
                if end is None:
                    obj[:] = value
                else:
                    obj[:end] = value
            else:
                if end is None:
                    obj[start:] = value
                else:
                    obj[start:end] = value

    def evaluate(self, env):
        obj = env.evaluate(self.ref)
        index = env.evaluate(self.index)
        start = env.evaluate(self.start)
        end = env.evaluate(self.end)
        if index is not None:
            return obj[index]
        else:
            if start is None:
                if end is None:
                    return obj[:]
                else:
                    return obj[:end]
            else:
                if self.end is None:
                    return obj[start:]
                else:
                    return obj[start:end]


class Call:
    def __init__(self, ref, args):
        self.ref = ref
        self.args = args
        self.value = None
        self.called = False
        self.returned = False

    def evaluate(self, env):
        callee = env.evaluate(self.ref)
        kwargs = {
            arg.keyword: env.evaluate(arg.value)
            for arg in self.args
            if isinstance(arg, KeywordArg)
        }
        evaluated_args = [
            env.evaluate(arg) for arg in self.args if not isinstance(arg, KeywordArg)
        ]

        # built-in input function requires runtime to be paused
        if callee is input:
            if not self.called:
                self.called = True
                if len(evaluated_args) > 0:
                    env.prompt = evaluated_args[0]
                raise InputCalled()
            else:
                if not self.returned:
                    self.returned = True
                    self.value = env.returned_value
                    env.returned_value = None
                    env.prompt = ""
                return self.value
        elif callee is super:
            if self.called:
                pass
            else:
                this = env.context.lookup("self")
                klass = this.__class__
                self.called, self.returned = True, True
                self.value = super(klass, this)
            return self.value

        if not self.called:
            self.called = True
            if callable(callee) and callee.__module__ == __name__:
                # user defined function
                sig = signature(callee)
                if "*args" in str(sig):
                    kwargs["is_called_by_library"] = False
            self.value = callee(*evaluated_args, **kwargs)
            self.returned = True  # built-ins reach here
            return self.value
        else:
            if not self.returned:
                self.returned = True
                self.value = env.returned_value
                env.returned_value = None
            return self.value


class KeywordArg:
    def __init__(self, keyword, value):
        self.keyword = keyword
        self.value = value


class BinaryOperation:
    def __init__(self, operator, left, right):
        self.operator = operator
        self.left = left
        self.right = right

    def evaluate(self, env):
        l = env.evaluate(self.left)
        r = env.evaluate(self.right)
        op = self.operator
        if op == KEYWORD_ADD:
            return l + r
        elif op == KEYWORD_SUBTRACT:
            return l - r
        elif op == KEYWORD_MULTIPLICATE:
            return l * r
        elif op == KEYWORD_EXPONENTIATE:
            return l**r
        elif op == KEYWORD_DIVIDE:
            return l / r
        elif op == KEYWORD_FLOOR_DIVIDE:
            return l // r
        elif op == KEYWORD_REMAIN:
            return l % r
        elif op == KEYWORD_EQUAL:
            return l == r
        elif op == KEYWORD_NOT_EQUAL:
            return l != r
        elif op == KEYWORD_LESS_THAN:
            return l < r
        elif op == KEYWORD_LESS_THAN_OR_EQUAL:
            return l <= r
        elif op == KEYWORD_GREATER_THAN:
            return l > r
        elif op == KEYWORD_GREATER_THAN_OR_EQUAL:
            return l >= r
        elif op == KEYWORD_AND:
            return l and r
        elif op == KEYWORD_OR:
            return l or r
        elif op == KEYWORD_IS:
            return l is r
        elif op == KEYWORD_IS_NOT:
            return l is not r
        elif op == KEYWORD_IN:
            return l in r
        elif op == KEYWORD_NOT_IN:
            return l not in r
        elif op == KEYWORD_BIT_AND:
            return l & r
        elif op == KEYWORD_BIT_OR:
            return l | r
        elif op == KEYWORD_BIT_XOR:
            return l ^ r
        elif op == KEYWORD_LEFT_SHIFT:
            return l << r
        elif op == KEYWORD_RIGHT_SHIFT:
            return l >> r


class UnaryOperation:
    def __init__(self, operator, operand):
        self.operator = operator
        self.operand = operand

    def evaluate(self, env):
        v = env.evaluate(self.operand)
        op = self.operator
        if op == KEYWORD_NOT:
            return not v
        elif op == KEYWORD_NEGATIVE:
            return -v
        elif op == KEYWORD_BIT_NOT:
            return ~v


class Environment:
    def __init__(self, code_list):
        self.code = code_list
        self.address = Address(1, 0)  # (indent, line)
        self.blocks = []
        self.callstack = []
        self.exception = None

        self.global_context = GlobalScope(None, {})
        self.context = self.global_context

        self.prompt = ""
        self.returned_value = None

    def evaluate(self, obj):
        if (
            isinstance(obj, int)
            or isinstance(obj, float)
            or isinstance(obj, bool)
            or isinstance(obj, str)
            or callable(obj)  # functions or classes
            or obj is None
        ):
            return obj
        elif isinstance(obj, list):
            return [self.evaluate(e) for e in obj]
        elif isinstance(obj, dict):
            return {k: self.evaluate(obj[k]) for k in obj.keys()}
        elif isinstance(obj, tuple):
            return tuple(self.evaluate(e) for e in obj)
        elif isinstance(obj, set):
            return {self.evaluate(e) for e in obj}
        else:
            return obj.evaluate(self)

    def skip_to_next_line(self):
        try:
            while True:
                next_line_index = self.address.line + 1
                try:
                    while True:
                        next_line = self.code[next_line_index]
                        next_indent = next_line[INDEX_INDENT]
                        delta = self.address.indent - next_indent
                        if delta >= 0:
                            for _ in range(delta):
                                block = self.blocks[-1]
                                result = block.did_exit(self)
                                if result == BLOCK_RESULT_JUMPPED:
                                    raise BreakInnerLoop()
                            raise BreakOuterLoop()
                        else:
                            next_line_index += 1
                            continue
                except BreakInnerLoop:
                    pass
                except:
                    raise
        except BreakOuterLoop:
            pass
        except:
            raise
        self.address.line = next_line_index


# commands
class Assign:
    def __init__(self, lhs, rhs):
        self.lhs = lhs
        self.rhs = rhs

    def execute(self, env):
        value = env.evaluate(self.rhs)
        if isinstance(self.lhs, tuple):
            for lhs, val in zip(self.lhs, value):
                lhs.assign(val, env)
        else:
            self.lhs.assign(value, env)


class Ifs:
    def execute(self, env):
        def enter(env):
            return True

        def exit(env):
            env.address.shift(-1)
            return BLOCK_RESULT_SHIFTED

        block = Block(BLOCK_KIND_IFS, env.address, enter, exit)
        block.will_enter(env)


def _execute_conditional_block(env):
    def enter(env):
        return True

    def exit(env):
        env.address.shift(-2)
        env.blocks.pop()
        return BLOCK_RESULT_JUMPPED

    block = Block(BLOCK_KIND_IF_ELIF_ELSE, env.address, enter, exit)
    block.will_enter(env)


class If:
    def __init__(self, condition):
        self.condition = condition

    def execute(self, env):
        if env.evaluate(self.condition):
            _execute_conditional_block(env)


class Elif(If):
    pass


class Else:
    def execute(self, env):
        _execute_conditional_block(env)


class For:
    def __init__(self, vars, iterable):
        self.vars = vars
        self.iterable = iterable

    def execute(self, env):
        iterator = iter(env.evaluate(self.iterable))

        def enter(env):
            try:
                next_value = next(iterator)
                if isinstance(self.vars, tuple):
                    for var, value in zip(self.vars, next_value):
                        var.assign(value, env)
                else:
                    self.vars.assign(next_value, env)
                return True
            except StopIteration:
                return False
            except:
                raise

        def exit(env):
            block.will_enter(env)
            return BLOCK_RESULT_JUMPPED

        block = Block(BLOCK_KIND_FOR, env.address, enter, exit)
        block.will_enter(env)


class While:
    def __init__(self, condition):
        self.condition = condition

    def execute(self, env):
        def enter(env):
            return env.evaluate(self.condition)

        def exit(env):
            block.will_enter(env)
            return BLOCK_RESULT_JUMPPED

        block = Block(BLOCK_KIND_WHILE, env.address, enter, exit)
        block.will_enter(env)


class Break:
    def execute(self, env):
        while True:
            block = env.blocks.pop()
            if (
                block.kind == BLOCK_KIND_IFS
                or block.kind == BLOCK_KIND_IF_ELIF_ELSE
                or block.kind == BLOCK_KIND_TRY
                or block.kind == BLOCK_KIND_EXCEPT
            ):
                env.address.shift(-1)
                continue
            elif block.kind == BLOCK_KIND_WHILE or block.kind == BLOCK_KIND_FOR:
                env.address.shift(-1)
                break
            else:
                raise InvalidBreak()


class Continue:
    def execute(self, env):
        while True:
            block = env.blocks.pop()
            if (
                block.kind == BLOCK_KIND_IFS
                or block.kind == BLOCK_KIND_IF_ELIF_ELSE
                or block.kind == BLOCK_KIND_TRY
                or block.kind == BLOCK_KIND_EXCEPT
            ):
                env.address.shift(-1)
                continue
            elif block.kind == BLOCK_KIND_WHILE or block.kind == BLOCK_KIND_FOR:
                block.will_enter(env)
                break
            else:
                raise InvalidContinue()


class Def:
    def __init__(self, name, params):
        self.name = name
        self.params = params

    def execute(self, env):
        defined_address = env.address.clone()
        nesting_scope = env.context.find_nesting_scope()
        is_classscope = isinstance(env.context, ClassScope)
        is_init = self.name == "__init__" and is_classscope

        def _func(*args, is_called_by_library=True):
            # could be called by standard libraries
            caller_addr = env.address.clone()
            local = FuncScope(
                nesting_scope,
                {param_name: arg for param_name, arg in zip(self.params, args)},
            )
            callee_addr = defined_address.clone()
            callee_addr.calls = caller_addr.calls + 1

            def enter(env):
                env.callstack.append(env.context)
                env.context = local
                return True

            has_exited = False

            def exit(env):
                env.address.jump(caller_addr)
                env.address.calls -= 1
                env.address.shift(0, -1)
                if is_init:
                    env.returned_value = env.context.lookup("self")
                env.context = env.callstack.pop()
                nonlocal has_exited
                has_exited = True
                return BLOCK_RESULT_JUMPPED

            block = Block(BLOCK_KIND_CALL, callee_addr, enter, exit)
            block.will_enter(env)
            if not is_called_by_library:
                raise FunctionCalled()
            else:
                parser = Parser()
                while not has_exited:
                    env.skip_to_next_line()
                    last_index = len(env.code) - 1
                    if env.address.indent == 0:
                        end_of_code = parser.read(env.code[last_index])
                        if not isinstance(end_of_code, End):
                            raise InvalidEnd()
                        break
                    else:
                        if env.address.line >= last_index:
                            break
                    line = env.code[env.address.line]
                    cmd = parser.read(line)
                    cmd.execute(env)

                env.skip_to_next_line()
                value = env.returned_value
                env.returned_value = None
                return value

        env.context.register(self.name, _func)


class Return:
    def __init__(self, expr):
        self.expr = expr

    def execute(self, env):
        env.returned_value = env.evaluate(self.expr)
        while True:
            block = env.blocks[-1]
            if block.kind == BLOCK_KIND_CALL:
                block.did_exit(env)
                return
            elif (
                block.kind == BLOCK_KIND_IFS
                or block.kind == BLOCK_KIND_IF_ELIF_ELSE
                or block.kind == BLOCK_KIND_TRY
                or block.kind == BLOCK_KIND_EXCEPT
                or block.kind == BLOCK_KIND_WHILE
                or block.kind == BLOCK_KIND_FOR
            ):
                env.blocks.pop()
                continue
            else:
                raise InvalidReturn()


class Class:
    def __init__(self, name, superclass):
        self.name = name
        self.superclass = superclass

    def execute(self, env):
        if self.superclass is None:
            superclass = object
        else:
            superclass = env.evaluate(self.superclass)

        def enter(env):
            parent = env.context.find_nesting_scope()
            env.context = ClassScope(parent, {})
            return True

        previous_context = env.context

        def exit(env):
            attributes = env.context.create_attributes()
            env.context = previous_context
            classtype = type(self.name, (superclass,), attributes)
            env.context.register(self.name, classtype)
            env.address.shift(-1)
            return BLOCK_RESULT_SHIFTED

        block = Block(BLOCK_KIND_CLASS_DEF, env.address, enter, exit)
        block.will_enter(env)


class Import:
    def __init__(self, name):
        self.name = name

    def execute(self, env):
        module_names = self.name.split(".")
        for name in module_names:
            if not name.isalnum():
                raise InvalidModuleName()
        exec("import {}".format(self.name))
        env.context.register(module_names[0], eval("{}".format(module_names[0])))


class ExprStmt:
    def __init__(self, value):
        self.value = value

    def execute(self, env):
        env.evaluate(self.value)


class Comment:
    def execute(self, env):
        pass  # do nothing


class Pass:
    def execute(self, env):
        pass  # do nothing


class End:
    def execute(self, env):
        pass  # do nothing


class Parser:
    def __init__(self):
        table = {}

        def _assign(line):
            lhs = self.read_ref(line[INDEX_ASSIGN_LHS])
            rhs = self.read_expr(line[INDEX_ASSIGN_RHS])
            return Assign(lhs, rhs)

        table[KEYWORD_ASSIGN] = _assign

        def _make_compound_assign(keyword, line):
            lhs = self.read_ref(line[INDEX_ASSIGN_LHS])
            rhs = self.read_expr(line[INDEX_ASSIGN_RHS])
            binop = BinaryOperation(keyword, lhs, rhs)
            return Assign(lhs, binop)

        def _compound_add(line):
            return _make_compound_assign(KEYWORD_ADD, line)

        table[KEYWORD_COMPOUND_ADD] = _compound_add

        def _compound_subtract(line):
            return _make_compound_assign(KEYWORD_SUBTRACT, line)

        table[KEYWORD_COMPOUND_SUBTRACT] = _compound_subtract

        def _compound_multiplicate(line):
            return _make_compound_assign(KEYWORD_MULTIPLICATE, line)

        table[KEYWORD_COMPOUND_MULTIPLICATE] = _compound_multiplicate

        def _ifs(line):
            return Ifs()

        table[KEYWORD_IFS] = _ifs

        def _if(line):
            condition = self.read_expr(line[INDEX_CONDITION])
            return If(condition)

        table[KEYWORD_IF] = _if

        def _elif(line):
            condition = self.read_expr(line[INDEX_CONDITION])
            return Elif(condition)

        table[KEYWORD_ELIF] = _elif

        def _else(line):
            return Else()

        table[KEYWORD_ELSE] = _else

        def _while(line):
            condition = self.read_expr(line[INDEX_CONDITION])
            return While(condition)

        table[KEYWORD_WHILE] = _while

        def _for(line):
            vars = self.read_ref(line[INDEX_FOR_VARIABLES])
            iterable = self.read_expr(line[INDEX_FOR_ITERABLE])
            return For(vars, iterable)

        table[KEYWORD_FOR] = _for

        def _break(line):
            return Break()

        table[KEYWORD_BREAK] = _break

        def _continue(line):
            return Continue()

        table[KEYWORD_CONTINUE] = _continue

        def _func_def(line):
            name = line[INDEX_DEF_NAME]
            params = line[INDEX_DEF_PARAMETERS]
            return Def(name, params)

        table[KEYWORD_DEF] = _func_def

        def _return(line):
            if len(line) - 1 < INDEX_RETURN_VALUE:
                return Return(None)
            else:
                expr = self.read_expr(line[INDEX_RETURN_VALUE])
                return Return(expr)

        table[KEYWORD_RETURN] = _return

        def _class_def(line):
            name = line[INDEX_CLASS_NAME]
            superclass = self.read_expr(line[INDEX_CLASS_SUPERCLASS])
            return Class(name, superclass)

        table[KEYWORD_CLASS] = _class_def

        def _import(line):
            name = line[INDEX_IMPORT_NAME]
            return Import(name)

        table[KEYWORD_IMPORT] = _import

        def _expr_stmt(line):
            value = self.read_expr(line[INDEX_EXPR_STMT])
            return ExprStmt(value)

        table[KEYWORD_EXPR_STMT] = _expr_stmt

        def _comment(line):
            return Comment()

        table[KEYWORD_COMMENT] = _comment

        def _pass(line):
            return Pass()

        table[KEYWORD_PASS] = _pass

        def _end(line):
            return End()

        table[KEYWORD_END] = _end

        self.table = table

    def read(self, line):
        kw = line[INDEX_KEYWORD]
        parser = self.table[kw]
        cmd = parser(line)
        return cmd

    def read_args(self, args_list):
        parsed_args = []
        for elem in args_list:
            arg = self.read_expr(elem)
            parsed_args.append(arg)
        return parsed_args

    def read_expr(self, obj):
        if isinstance(obj, list):
            if isinstance(obj[0], list):
                parsed_list = []
                for elem in obj[0]:
                    value = self.read_expr(elem)
                    parsed_list.append(value)
                return parsed_list
            kw = obj[INDEX_EXPRESSION_KEYWORD]
            if (
                kw == KEYWORD_VAR
                or kw == KEYWORD_ATTR
                or kw == KEYWORD_SUBSCRIPT
                or kw == KEYWORD_CALL
            ):
                ref = self.read_ref(obj)
                return ref
            elif kw == KEYWORD_TUPLE:
                return tuple(
                    self.read_expr(elem) for elem in obj[INDEX_EXPRESSION_KEYWORD + 1 :]
                )
            elif kw == KEYWORD_KWARG:
                return KeywordArg(
                    obj[INDEX_KWARG_KEYWORD], self.read_expr(obj[INDEX_KWARG_VALUE])
                )
            elif kw == KEYWORD_NOT or kw == KEYWORD_NEGATIVE or kw == KEYWORD_BIT_NOT:
                operand = self.read_expr(obj[INDEX_UNARY_OPERAND])
                unary_op = UnaryOperation(kw, operand)
                return unary_op
            else:
                left = self.read_expr(obj[INDEX_LEFT_OPERAND])
                right = self.read_expr(obj[INDEX_RIGHT_OPERAND])
                bin_op = BinaryOperation(kw, left, right)
                return bin_op

        if isinstance(obj, dict):
            parsed_dict = {}
            for key in obj:
                parsed_dict[key] = self.read_expr(obj[key])
            return parsed_dict
        else:
            return obj

    def read_ref(self, listobj):
        kw = listobj[INDEX_EXPRESSION_KEYWORD]
        if kw == KEYWORD_VAR:
            name = listobj[INDEX_VAR_NAME]
            return Variable(name)
        elif kw == KEYWORD_ATTR:
            obj = self.read_expr(listobj[INDEX_ATTR_OBJECT])
            properties = []
            for i in range(INDEX_ATTR_PROPERTIES, len(listobj)):
                properties.append(listobj[i])
            return Attribute(obj, properties)
        elif kw == KEYWORD_SUBSCRIPT:
            ref = self.read_ref(listobj[INDEX_SUBSCRIPT_REFERENCE])
            if len(listobj) == 3:
                index = self.read_expr(listobj[INDEX_SUBSCRIPT_INDEX])
                return Subscript(ref, index)
            elif len(listobj) == 4:
                start = self.read_expr(listobj[INDEX_SUBSCRIPT_SLICE_START])
                end = self.read_expr(listobj[INDEX_SUBSCRIPT_SLICE_END])
                return Subscript(ref, None, start, end)
        elif kw == KEYWORD_CALL:
            ref = self.read_ref(listobj[INDEX_CALL_REFERENCE])
            args = self.read_args(listobj[INDEX_CALL_ARGS])
            return Call(ref, args)
        elif kw == KEYWORD_COMMA:
            return tuple(
                self.read_expr(e) for e in listobj[INDEX_EXPRESSION_KEYWORD + 1 :]
            )


class BreakInnerLoop(Exception):
    pass


class BreakOuterLoop(Exception):
    pass


class FunctionCalled(Exception):
    pass


class InputCalled(Exception):
    pass


class InvalidBreak(Exception):
    pass


class InvalidContinue(Exception):
    pass


class InvalidEnd(Exception):
    pass


class InvalidModuleName(Exception):
    pass


class InvalidReturn(Exception):
    pass
