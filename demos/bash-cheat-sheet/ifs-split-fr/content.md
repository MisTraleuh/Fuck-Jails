```sh -cwn
# !callout[/IFS=/] Changer IFS modifie le split des mots par bash
$ x='i]d'; IFS=']'; $x
uid=1000(mistrale) gid=1000(mistrale)

$ cmd='c]a]t /]e]t]c]/]p]a]s]s]w]d'
$ IFS=']'; $cmd | head -1
root:x:0:0:root:/root:/bin/bash

```
