#### Description

The `stripe prices` command group manages Stripe prices. Prices define the cost of a product and the billing interval for recurring subscriptions.

Available subcommands:

- **list** — List prices for a specific product
- **create** — Create a new recurring price for a product

#### Usage

```bash
aux4 stripe prices <subcommand>
```

#### Example

```bash
aux4 stripe prices list prod_abc123
aux4 stripe prices create --productId prod_abc123 --amount 1000 --currency usd --interval month
```
