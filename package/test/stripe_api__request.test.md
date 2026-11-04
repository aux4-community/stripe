# stripe api request

## should reject invalid HTTP methods without accessing Stripe

```file:request.json
{
  "method": "INVALID",
  "path": "/v1/account"
}
```

```execute
aux4 stripe api request < request.json
```

```error:partial
method must be GET, POST or DELETE
```

## should reject requests to external hosts

```file:request.json
{
  "method": "GET",
  "path": "https://example.com"
}
```

```execute
aux4 stripe api request < request.json
```

```error:partial
path must be a Stripe /v1/ API path
```
