#### Description

The `stripe prices list` command lists all prices associated with a specific product. The product ID is passed as a positional argument. You can control the number of results with the `--limit` flag.

The command calls `stripe prices list --product <productId>`.

#### Usage

```bash
aux4 stripe prices list <productId> [--limit <number>]
```

productId  The Stripe product ID to list prices for (positional argument)
--limit    Number of prices to return (default: 10)

#### Example

```bash
aux4 stripe prices list prod_abc123 --limit 5
```
