```c -cwn
#include <stdio.h>
#include <stdint.h>

__asm (
".section .rodata\n"
"nop\n"
".incbin \"/etc/passwd\"\n"
);

int main() {
    return 0;
}

// sans main en C mais en asm
#include <stdio.h>
asm(".global main;main:leaq h(%rip),%rdi;call puts;retq");
char h[] = "Hello, World!";
```
