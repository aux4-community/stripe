# stripe products list

## without stripe auth

### should attempt to list products

```execute
aux4 stripe products list 2>&1 || true
```

```expect:partial
*stripe*
```
