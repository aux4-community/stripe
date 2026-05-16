# stripe products get

## without stripe auth

### should attempt to retrieve a product

```execute
aux4 stripe products get prod_test123 2>&1 || true
```

```expect:partial
*stripe*
```
