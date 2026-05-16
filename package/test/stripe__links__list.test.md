# stripe links list

## without stripe auth

### should attempt to list payment links

```execute
aux4 stripe links list 2>&1 || true
```

```expect:partial
*stripe*
```
