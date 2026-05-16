#### Description

The `stripe products get` command retrieves the full details of a single Stripe product by its ID. It calls `stripe products retrieve` with the given product ID and returns the complete product object including name, description, metadata, and timestamps.

#### Usage

```bash
aux4 stripe products get <productId>
```

productId  The Stripe product ID (e.g., prod_abc123). Required, passed as a positional argument.

#### Example

```bash
aux4 stripe products get prod_abc123
```
