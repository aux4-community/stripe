#### Description

The `stripe subscriptions` command group manages Stripe subscriptions. Subscriptions represent recurring billing relationships between your business and customers.

Available subcommands:

- **list** — List subscriptions filtered by status
- **get** — Retrieve a subscription by ID
- **cancel** — Cancel an active subscription (with confirmation prompt)

#### Usage

```bash
aux4 stripe subscriptions <subcommand>
```

#### Example

```bash
aux4 stripe subscriptions list --status active
aux4 stripe subscriptions get sub_abc123
aux4 stripe subscriptions cancel sub_abc123
```
