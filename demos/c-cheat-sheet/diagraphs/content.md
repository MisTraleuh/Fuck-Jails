```c -cwn
/*
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
```