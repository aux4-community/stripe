# stripe webhooks trigger

## without stripe auth

### should attempt to trigger a test event

```execute
aux4 stripe webhooks trigger checkout.session.completed 2>&1 || true
```

```expect:partial
*stripe*
```
