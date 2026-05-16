# stripe revenue payouts

## without stripe auth

### should attempt to list payouts

```execute
aux4 stripe revenue payouts 2>&1 || true
```

```expect:partial
*stripe*
```
