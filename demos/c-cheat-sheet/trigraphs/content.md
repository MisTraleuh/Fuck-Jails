```c -cwn
/*
Trigraphs:
??= : #
??/ : \
??' : ^
??( : [
??) : ]
??! : |
??< : {
??> : }
??- : ~

Note: Les trigraphes nécessitent le flag -trigraphs avec GCC
(par défaut désactivés depuis GCC 4.7+)
*/

??=include <stdio.h>

int main()
??<
    char s??(??) = "I love Digraphs! Thx MisTrale";
    puts(s);
    return 0;
??>
```