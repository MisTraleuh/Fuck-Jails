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

```jsx !content
content = {
  // !block(1:4) 1
  intro: {
    title: "Roman Emperors",
    children: <p>The ...</p>,
  },
  emperors: [
    // !block(1:9) 2
    {
      title: "Augustus",
      children: <p>The ...</p>,
      img: { src: "/one.png" },
      code: {
        lang: "js",
        value: "console.log(1)",
      },
    },
    // !block 3
    { title: "Nero", ... },
    // !block 4
    { title: "Trajan", ... },
  ],
}
```
