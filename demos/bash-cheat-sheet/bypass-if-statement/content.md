```sh -cwn
x='x[$(id>&2)]'
if [[ ! -v "$x" ]]; then
     exit 1
fi
uid=1000(mistrale) gid=1000(mistrale) groups=1000(mistrale)

# Work also with
$ x='x[$(id>&2)]'
$ if [[ "$x" -eq "" ]]; then
     exit 1
fi
uid=1000(mistrale) gid=1000(mistrale) groups=1000(mistrale)
```