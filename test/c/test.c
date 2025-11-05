#include "stdio.h"

// Macros pour créer des strings (très peu connu)
#define STR(x) #x
#define CAT(a, b) a##b
#define HELLO_CAT "he" "llo"

int main (void) {
    // 1. Concaténation de string literals (déjà présent)
    char s[] = "h""e""l""l""o";
    puts(s);

    // 2. Tableau de caractères
    char p[] = {'h', 'e', 'l', 'l', 'o', 0};
    puts(p);

    // 3. Octal escape sequences (très peu connu!)
    char octal[] = "\150\145\154\154\157";
    puts(octal);

    // 4. Hexadecimal escape sequences
    char hex[] = "\x68\x65\x6C\x6C\x6F";
    puts(hex);

    // 5. Universal character names (peu connu)
    //char unicode[] = L"\u0068\u0065\u006C\u006C\u006F";
    //puts(unicode);

    // 6. Mélange octal et hexadécimal
    char mixed[] = "\150\x65\154\x6C\157";
    puts(mixed);

    // 7. Utilisation de valeurs numériques directement
    char numeric[] = {0x68, 0x65, 0x6C, 0x6C, 0x6F, 0x00};
    puts(numeric);

    // 8. Utilisation de calculs arithmétiques (très peu connu!)
    char calc[] = {'h' - 0, 'e' + 0, 'l' * 1, 'l' / 1, 'o' % 256, '\0'};
    puts(calc);

    // 9. Utilisation de macros avec stringify
    char macro_str[] = STR(hello);
    puts(macro_str);

    // 10. Utilisation de macros avec concaténation
    char macro_cat[] = HELLO_CAT;
    puts(macro_cat);

    // 11. Utilisation de pointeurs avec casting (très peu connu!)
    char *ptr_str = (char[]){104, 101, 108, 108, 111, 0};
    puts(ptr_str);

    // 12. Utilisation de caractères avec notation octale dans les tableaux
    char octal_array[] = {'\150', '\145', '\154', '\154', '\157', '\0'};
    puts(octal_array);

    // 13. Utilisation de caractères avec notation hexadécimale dans les tableaux
    char hex_array[] = {'\x68', '\x65', '\x6C', '\x6C', '\x6F', '\0'};
    puts(hex_array);


    // 15. Utilisation de caractères avec notation octale dans les tableaux
    char mixed_array[] = {'\150', '\x65', '\154', '\x6C', '\157', '\0'};
    puts(mixed_array);
    
    return 0;
}