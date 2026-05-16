# stripe revenue charges

## without stripe auth

### should attempt to list charges

```execute
aux4 stripe revenue charges 2>&1 || true
```

```expect:partial
*?
```
