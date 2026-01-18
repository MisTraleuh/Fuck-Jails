```sh -cwn
# BASH_XTRACEFD - Redirect xtrace to any FD
$ exec 3>/tmp/trace.log
$ BASH_XTRACEFD=3
$ set -x
$ id
uid=1000(mistrale) gid=1000(mistrale) groups=1000(mistrale)
```


