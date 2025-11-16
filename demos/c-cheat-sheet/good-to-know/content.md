### Preprocessing tricks:
```c -cwn
// Leak file
#include "/etc/passwd"

// variable without type (only work in global)
a;
s="hello";
int main(void) {
    printf("%d:%s", a, s);
    return 0;
}

```