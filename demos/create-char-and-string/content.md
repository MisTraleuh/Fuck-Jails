```py -cwn
# Normal
print("hello")

# hex escapes
print("\x68\x65\x6c\x6c\x6f")

# octal escapes
print("\150\145\154\154\157")

# unicode code points
print("\u0068\u0065\u006c\u006c\u006f")
print("\U00000068\U00000065\U0000006c\U0000006c\U0000006f")

# Only with builtins
print(().__doc__[56] + ().__doc__[17] + ().__doc__[3] + ().__doc__[3] + ().__doc__[34])
print(().__doc__[56].__add__(().__doc__[17].__add__(().__doc__[3].__add__(().__doc__[3].__add__(().__doc__[34])))))
```
