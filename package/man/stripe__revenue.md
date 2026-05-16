#### Description

The `stripe revenue` command group provides revenue monitoring and reporting tools. It aggregates data from subscriptions, charges, invoices, and payouts to give you a comprehensive view of your business finances.

Available subcommands:

- **summary** — Show MRR, ARR, and active subscriber count
- **charges** — List recent charges
- **invoices** — List invoices filtered by status
- **balance** — Show current Stripe account balance
- **payouts** — List recent payouts to your bank account

#### Usage

```bash
aux4 stripe revenue <subcommand>
```

#### Example

```bash
aux4 stripe revenue summary
aux4 stripe revenue charges --limit 50
aux4 stripe revenue balance
```
