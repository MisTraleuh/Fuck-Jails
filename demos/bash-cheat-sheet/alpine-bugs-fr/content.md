```sh -cwn
# Sur alpine
$ a=$(echo -e '\xffz'); if [[ $a =~ 'z' ]]; then echo 1; else echo 0; fi
0

# Sur vrai bash
$ a=$(echo -e '\xffz'); if [[ $a =~ 'z' ]]; then echo 1; else echo 0; fi
1
```
