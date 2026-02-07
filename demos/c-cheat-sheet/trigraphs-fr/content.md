```c -cwn
/*
Trigraphes:
??= : #
??/ : \
??' : ^
??( : [
??) : ]
??! : |
??< : {
??> : }
??- : ~

Note: Les trigraphes necessitent le flag -trigraphs avec GCC
(par defaut desactives depuis GCC 4.7+)
*/

??=include <stdio.h>

int main()
??<
    char s??(??) = "J'aime les diagraphes! Thx MisTrale";
    puts(s);
    return 0;
??>
```
