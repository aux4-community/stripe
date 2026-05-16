#### Description

The `stripe webhooks trigger` command triggers a test webhook event. This is useful for testing your webhook handlers without needing to perform actual actions in the Stripe dashboard.

The event type is passed as a positional argument. Supported events include:

- **checkout.session.completed** — A checkout session was completed
- **customer.subscription.created** — A new subscription was created
- **customer.subscription.updated** — A subscription was updated
- **customer.subscription.deleted** — A subscription was canceled/deleted
- **invoice.payment_succeeded** — An invoice payment succeeded
- **invoice.payment_failed** — An invoice payment failed
- **charge.refunded** — A charge was refunded

#### Usage

```bash
aux4 stripe webhooks trigger <event>
```

event  The event type to trigger (positional argument, select from available options)

#### Example

```bash
aux4 stripe webhooks trigger checkout.session.completed
```
