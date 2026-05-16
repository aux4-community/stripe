#### Description

The `stripe revenue invoices` command lists invoices from your Stripe account, filtered by status. This is useful for tracking paid revenue, identifying open invoices that need attention, or reviewing voided invoices.

#### Usage

```bash
aux4 stripe revenue invoices [--limit <number>] [--status <status>]
```

--limit   Number of invoices to list (default: 25)
--status  Filter by invoice status: paid, open, void, or uncollectible (default: paid)

#### Example

```bash
aux4 stripe revenue invoices --status open --limit 10
```
