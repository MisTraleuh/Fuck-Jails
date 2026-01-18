```sh -cwn
$ ls
README.md  docs  node_modules  package-lock.json  package.json
$ ls *a*
package-lock.json  package.json
$ ls p?ck*
package-lock.json  package.json
$ ls -l [A-Z][A-Z][A-Z][A-Z][A-Z][A-Z].[a-z][a-z]
-rwxrwxrwx 1 MisTrale MisTrale 590 Apr 30 20:14 README.md
$ eval {j..m}{m..u}\;
jm: command not found
jr: command not found
[...]
README.md  docs  node_modules  package-lock.json  package.json
[...]

$ cat /etc/shadow
cat: /etc/shadow: Permission denied
$ sudo !!
root:*:19478:0:99999:7:::

$ echo "Welcome, my name is MisTraleuh" > /tmp/local
$ cat !$
Welcome, my name is MisTraleuh
```