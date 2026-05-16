# stripe revenue invoices

## without stripe auth

### should attempt to list invoices

```execute
aux4 stripe revenue invoices 2>&1 || true
```

```expect:partial
*stripe*
```
