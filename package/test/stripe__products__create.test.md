# stripe products create

## without stripe auth

### should attempt to create a product

```execute
aux4 stripe products create --name "Test Product" --description "A test product" 2>&1 || true
```

```expect:partial
*stripe*
```
