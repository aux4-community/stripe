# stripe subscriptions cancel

## without stripe auth

### should attempt to cancel a subscription

```execute
aux4 stripe subscriptions cancel sub_test123 --yes 2>&1 || true
```

```expect:partial
*stripe*
```
