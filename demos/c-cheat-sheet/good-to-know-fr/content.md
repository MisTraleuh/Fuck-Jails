### Astuces de preprocessing:
```c -cwn
// Fuite de fichier
#include "/etc/passwd"

// variable sans type (fonctionne seulement en global)
a;
s="hello";
int main(void) {
    printf("%d:%s", a, s);
    return 0;
}

```
