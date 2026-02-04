```py -cwn
def safe():
    return "safe"

def injected():
    import os
    os.system("id")

print("before:", safe())

# Override the function's implementation.
safe.__code__ = injected.__code__

print("after:")
safe()
```
