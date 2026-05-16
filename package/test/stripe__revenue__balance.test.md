# stripe revenue balance

## without stripe auth

### should attempt to show balance

```execute
aux4 stripe revenue balance 2>&1 || true
```

```expect:partial
*stripe*
```
