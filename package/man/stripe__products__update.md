#### Description

The `stripe products update` command updates an existing Stripe product. Currently it supports updating the product name. The product ID is passed as a positional argument.

The command calls `stripe products update` with the product ID and the new `--name` value.

#### Usage

```bash
aux4 stripe products update <productId> --name <name>
```

productId  The Stripe product ID to update (positional argument)
--name     The new product name (required)

#### Example

```bash
aux4 stripe products update prod_abc123 --name "Enterprise Plan"
```
