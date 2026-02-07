```sh -cwn
# Sortie normale : fd = 1 (stdout)
$ ls -la
total 728
[...]
-rw-r--r--@   1 nathan  staff    3194 Nov 23 21:40 README.md
drwxr-xr-x@  17 nathan  staff     544 Nov 18 21:41 app
[...]

# Sortie d'erreur : fd = 2 (stderr)
$ ls -la >&2
total 728
[...]
-rw-r--r--@   1 nathan  staff    3194 Nov 23 21:40 README.md
drwxr-xr-x@  17 nathan  staff     544 Nov 18 21:41 app
[...]

# Entree: fd = 0 (stdin)
$ /bin/bash -c 'ls -la >&0' >&/dev/null
total 728
[...]
-rw-r--r--@   1 nathan  staff    3194 Nov 23 21:40 README.md
drwxr-xr-x@  17 nathan  staff     544 Nov 18 21:41 app
[...]
```
