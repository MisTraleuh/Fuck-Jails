```c -cwn
/*
Diagraphes:
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
    char s<::> = "J'aime les diagraphes! Thx MisTrale";
    puts(s);
    return 0;
%>
```
