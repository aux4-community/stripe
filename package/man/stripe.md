#### Description

The `stripe` command is the top-level entry point for all Stripe management commands. It provides subcommand groups for managing products, prices, payment links, subscriptions, customers, webhooks, and revenue monitoring.

The management commands wrap the Stripe CLI and use its authentication. The generic API command uses an explicit API key environment variable and test/live mode, independently of CLI login.

Available subcommands:

- **products** — Create, list, get, and update Stripe products
- **prices** — List and create recurring prices
- **links** — List and create payment links
- **subscriptions** — List, get, and cancel subscriptions
- **customers** — List and search customers
- **webhooks** — Listen for events, list endpoints, and trigger test events
- **api** — Make generic Stripe HTTP requests
- **revenue** — Monitor MRR, ARR, charges, invoices, balance, and payouts

#### Usage

```bash
aux4 stripe <subcommand>
```

#### Example

```bash
aux4 stripe products list
aux4 stripe revenue summary
aux4 stripe webhooks listen
```
