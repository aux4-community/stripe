#### Description

The `stripe webhooks` command group manages Stripe webhooks. Webhooks allow your application to receive real-time event notifications from Stripe (e.g., when a payment succeeds or a subscription is canceled).

Available subcommands:

- **listen** — Forward webhook events to a local endpoint for development
- **endpoints** — List configured webhook endpoints
- **trigger** — Trigger a test webhook event

#### Usage

```bash
aux4 stripe webhooks <subcommand>
```

#### Example

```bash
aux4 stripe webhooks listen --forwardTo http://localhost:3001/v1/billing/events
aux4 stripe webhooks endpoints
aux4 stripe webhooks trigger checkout.session.completed
```
