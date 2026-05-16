# stripe links create

## without stripe auth

### should attempt to create a payment link

```execute
aux4 stripe links create price_test123 2>&1 || true
```

```expect:partial
*stripe*
```
