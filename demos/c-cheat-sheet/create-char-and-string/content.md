```c -cwn
#include "stdio.h"

// Macros for creating strings
#define STR(x) #x
#define CAT(a, b) a##b
#define HELLO_CAT "he" "llo"

int main(void) {
    // 1. Concatenation of string literals
    // !callout[/\"l\"\"l\"\"o\"/] Every string assignation can be used by a char table like : {..., ..., ..., ..., ...} 
    char s[] = "h""e""l""l""o";
    puts(s);

    // 2. Character table
    char p[] = {'h', 'e', 'l', 'l', 'o'};
    puts(p);

    // 3. Octal escape sequences
    char octal[] = "\150\145\154\154\157";
    puts(octal);

    // 4. Hexadecimal escape sequences
    char hex[] = "\x68\x65\x6C\x6C\x6F";
    puts(hex);

    // !diff -
    ! Depends of the compilor !
    // !diff +
    // 5. Universal character names
    // !diff +
    char unicode[] = "\u0068\u0065\u006C\u006C\u006F";
    // !diff +
    puts(unicode);

    // 9. Using macros with stringify
    char macro_str[] = STR(hello);
    puts(macro_str);

    // 10. Using macros with concatenation
    char macro_cat[] = HELLO_CAT;
    puts(macro_cat);
    
    return 0;
}
```
