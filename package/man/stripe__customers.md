#### Description

The `stripe customers` command group manages Stripe customers. Customers represent the accounts that have payment relationships with your business.

Available subcommands:

- **list** — List customers with configurable limit
- **search** — Search customers by email address

#### Usage

```bash
aux4 stripe customers <subcommand>
```

#### Example

```bash
aux4 stripe customers list --limit 20
aux4 stripe customers search user@example.com
```
