# stripe customers list

## without stripe auth

### should attempt to list customers

```execute
aux4 stripe customers list 2>&1 || true
```

```expect:partial
*stripe*
```
