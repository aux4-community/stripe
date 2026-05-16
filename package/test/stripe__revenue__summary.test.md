# stripe revenue summary

## without stripe auth

### should attempt to show revenue summary

```execute
aux4 stripe revenue summary 2>&1 || true
```

```expect:partial
*?
```
