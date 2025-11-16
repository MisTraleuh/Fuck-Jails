```c -cwn
#include <stdio.h>

int main() {
    const int h = (((__STDC__)*(__STDC__+__STDC__)+(__STDC__+__STDC__)+(__STDC__+__STDC__)*(__STDC__+__STDC__)+(__STDC__+__STDC__)+(__STDC__+__STDC__)) + (__STDC__)) * ((__STDC__+__STDC__)+(__STDC__+__STDC__)) * (__STDC__+__STDC__);
    const int e = (__CHAR_BIT__ +__LITTLE_ENDIAN__+ __LITTLE_ENDIAN__)*(__SIZEOF_POINTER__+__STDC_HOSTED__+__STDC_HOSTED__) + __STDC_HOSTED__;
    const int l = (__SCHAR_MAX__)-(((__BOOL_WIDTH__+__FLT16_MAX_10_EXP__))-(__STDC_UTF_16__-__SIZEOF_PTRDIFF_T__));
    const int o = (__INT_FAST64_WIDTH__*__GCC_ATOMIC_WCHAR_T_LOCK_FREE)-(__SHRT_WIDTH__+__FLT16_HAS_INFINITY__);
    printf("%s\n", (char []){h, e, l, l, o, 0});
}
```
