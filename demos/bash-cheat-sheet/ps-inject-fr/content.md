```sh -cwn
$ PS1='$(id>/tmp/ps1.log)$ '
$ ls >/dev/null
$ cat /tmp/ps1.log
uid=1000(mistrale) gid=1000(mistrale) groups=1000(mistrale)

# Beacon C2 a chaque appui sur Enter
$ PS4='+(${BASH_SOURCE}:${LINENO}): ${FUNCNAME[0]:+${FUNCNAME[0]}(): }'
$ set -x
$ echo test
+(stdin:1): echo test
test

# !callout[/PROMPT_COMMAND/] S'execute apres chaque commande, avant le prompt. Ideal pour l'exfiltration.
$ PROMPT_COMMAND='id > /tmp/log.log'
$ rm /tmp/ps1.log /tmp/trace.log 2>/dev/null
```
