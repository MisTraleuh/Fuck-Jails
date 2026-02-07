```sh -cwn
# BASH_XTRACEFD - Rediriger xtrace vers n'importe quel FD
$ exec 3>/tmp/trace.log
$ BASH_XTRACEFD=3
$ set -x
$ id
uid=1000(mistrale) gid=1000(mistrale) groups=1000(mistrale)
```
