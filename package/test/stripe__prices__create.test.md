# stripe prices create

## without stripe auth

### should attempt to create a price

```execute
aux4 stripe prices create --productId prod_test123 --amount 500 --currency usd --interval month 2>&1 || true
```

```expect:partial
*stripe*
```
