#### Description

The `stripe prices create` command creates a new recurring price for a product. It requires the product ID and the amount in cents (e.g., 500 for $5.00). You can optionally specify the currency and billing interval.

The command calls `stripe prices create` with the recurring interval set as a nested parameter.

#### Usage

```bash
aux4 stripe prices create --productId <id> --amount <cents> [--currency <code>] [--interval <period>]
```

--productId  The Stripe product ID to attach the price to (required)
--amount     The price amount in cents (e.g., 500 for $5.00) (required)
--currency   The three-letter currency code (default: usd)
--interval   The billing interval: month or year (default: month)

#### Example

```bash
aux4 stripe prices create --productId prod_abc123 --amount 1999 --currency usd --interval month
```

This creates a $19.99/month recurring price for the given product.
