```sh -cwn
$ declare wallet_balance=1337
$ printf 'before: %s\n' "$wallet_balance"
before: 1337
$ target_var=wallet_balance
# !callout[/declare -n/] Strings become live pointers. Touch the ref, mutate the original.
$ declare -n ref="$target_var"
$ ref=$((ref + 865))
$ printf 'after : %s\n' "$wallet_balance"
after : 2202
```

