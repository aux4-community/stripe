# stripe subscriptions get

## without stripe auth

### should attempt to retrieve a subscription

```execute
aux4 stripe subscriptions get sub_test123 2>&1 || true
```

```expect:partial
*stripe*
```
