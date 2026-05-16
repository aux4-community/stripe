#### Description

The `stripe subscriptions get` command retrieves the full details of a subscription by its ID. It returns the complete subscription object including status, current period, plan details, and customer information.

#### Usage

```bash
aux4 stripe subscriptions get <subscriptionId>
```

subscriptionId  The Stripe subscription ID (e.g., sub_abc123). Required, passed as a positional argument.

#### Example

```bash
aux4 stripe subscriptions get sub_abc123
```
