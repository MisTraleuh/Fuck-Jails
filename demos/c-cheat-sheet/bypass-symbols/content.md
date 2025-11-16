```c -cwn
/*
Trigraphs:
??= : #
??/ : \
??' : ^
??( : [
??) : ]
??! : |
??< : {
??> : }
??- : ~

Diagraphs:
<% : {
%> : }
<: : [
:> : ]
%: : #
%:%: : ##
<%: : {#
%>% : }#
*/

%:include <stdio.h>

int main()
<%
    char s<::> = "I love Digraphs! Thx MisTrale";
    puts(s);
    return 0;
%>

// Main without {}#%>?!
// !callout[/gnu/] can be : __attribute__((section(".text")))
[[gnu::section(".text")]] char main[] = "\xeb\x17\x31\xc0\xb0\x04\x31\xdb\xb3\x01\x59\x31\xd2\xb2\x0d\xcd\x80\x31\xc0\xb0\x01\x31\xdb\xcd\x80\xe8\xe4\xff\xff\xff\x48\x65\x6c\x6c\x6f\x20\x57\x6f\x72\x6c\x64\x21\x0a";
```
