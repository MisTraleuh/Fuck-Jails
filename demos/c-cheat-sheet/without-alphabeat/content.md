```c -cwn
// gcc -Wl,--entry=_ -nostartfiles -w -O0
(*$)();
(*$__)();
_(){
    $__= 84884400; // 0x50f3bb0 -> mov $rax, 0x3b; syscall
    $=_+11; // move to execve
    $("\057\142\151\156\057\142\141\163\150", 0, 0); // $("/bin/bash", 0, 0)
}
```
