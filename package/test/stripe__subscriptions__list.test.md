# stripe subscriptions list

## without stripe auth

### should attempt to list subscriptions

```execute
aux4 stripe subscriptions list 2>&1 || true
```

```expect:partial
*stripe*
```
