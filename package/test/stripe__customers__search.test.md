# stripe customers search

## without stripe auth

### should attempt to search customers by email

```execute
aux4 stripe customers search test@example.com 2>&1 || true
```

```expect:partial
*stripe*
```
