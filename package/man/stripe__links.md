#### Description

The `stripe links` command group manages Stripe payment links. Payment links are shareable URLs that customers can use to make payments without needing a custom checkout integration.

Available subcommands:

- **list** — List existing payment links
- **create** — Create a new payment link for a price

#### Usage

```bash
aux4 stripe links <subcommand>
```

#### Example

```bash
aux4 stripe links list
aux4 stripe links create price_abc123
```
