```c -cwn
// !callout[/echo/] to see avaible macro
// echo "" | gcc -dM -E -
#include <stdio.h>
#include <stdlib.h>

int main() {
    __WINT_TYPE__ L = (__SCHAR_MAX__)-(((__BOOL_WIDTH__+__FLT16_MAX_10_EXP__))-(__STDC_UTF_16__-__SIZEOF_PTRDIFF_T__));
    __WINT_TYPE__ S = ((__DBL_DECIMAL_DIG__+__DBL_DIG__)*(__FLT_RADIX__))+__DBL_MANT_DIG__-__FLT_RADIX__;
    __WINT_TYPE__ DASH = (__INT_FAST32_WIDTH__)-(__FLT16_MIN_EXP__);
    __WINT_TYPE__ SLASH = DASH + __PIC__;
    __WINT_TYPE__ A = __INTMAX_WIDTH__+__STDC__;
    __WINT_TYPE__ SPACE = __INT_LEAST32_WIDTH__;

    // CAN ALSO WORK WITH __STRING(LS)
    printf("%s\n", __STRING(LS));

    // !callout[/system/] you need to retrieve the offset
    system((__INT8_TYPE__ []){L, S, SPACE, DASH, L, A, SPACE, SLASH, 0});
}
```
