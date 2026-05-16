# stripe prices list

## without stripe auth

### should attempt to list prices for a product

```execute
aux4 stripe prices list prod_test123 2>&1 || true
```

```expect:partial
*stripe*
```
