#### Description

Make generic HTTP requests to Stripe using explicit test/live credentials. Request data supports nested objects and arrays. API authentication, form encoding, connected-account headers and idempotent retries are handled here.

#### Usage

```bash
aux4 stripe api request < request.json
```

#### Example

```bash
aux4 stripe api request < account-request.json
```
