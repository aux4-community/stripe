#### Description

The `stripe products list` command lists all products in your Stripe account. It calls `stripe products list` with a configurable limit on the number of results returned.

By default, it returns the 10 most recent products. Use the `--limit` flag to control how many products are displayed.

#### Usage

```bash
aux4 stripe products list [--limit <number>]
```

--limit  Number of products to list (default: 10)

#### Example

```bash
aux4 stripe products list --limit 25
```
