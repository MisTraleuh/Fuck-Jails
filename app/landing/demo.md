```jsx !page
(lambda:...).__globals__

// !rainbow(1:2)
# obtain builtins from generators
// !tt[/f_builtins/] foo
(_ for _ in ()).gi_frame.f_builtins
(await _ for _ in ()).ag_frame.f_builtins

@exec
@input
// !callout[/def/] Can be class
def a():
  // !rainbow(1:) 1
  pass

# walrus operator (>= python3.8)
// !diff + 
[a:=().__doc__, print(a)]
// !diff -
(lambda a: print(a))(().__doc__)
```

```py !content
>>> import sys
>>> frame = sys._getframe()
>>> 
>>> frame.f_builtins == __builtins__.__dict__
True
>>> frame.f_builtins['abc'] = 3
>>> frame.f_builtins['abc']
3
>>> frame.f_builtins == __builtins__.__dict__
True
```
