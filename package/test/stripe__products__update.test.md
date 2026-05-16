# stripe products update

## without stripe auth

### should attempt to update a product

```execute
aux4 stripe products update prod_test123 --name "Updated Name" 2>&1 || true
```

```expect:partial
*stripe*
```
