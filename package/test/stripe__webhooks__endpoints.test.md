# stripe webhooks endpoints

## without stripe auth

### should attempt to list webhook endpoints

```execute
aux4 stripe webhooks endpoints 2>&1 || true
```

```expect:partial
*stripe*
```
