```py -cwn
def safe():
    return "safe"

def injected():
    import os
    os.system("id")

print("before:", safe())

# Remplace l'implementation de la fonction.
safe.__code__ = injected.__code__

print("after:")
safe()
```
