#### Description

The `stripe links create` command creates a new payment link for a given price. The resulting link can be shared with customers to complete a purchase. The link automatically includes one unit of the specified price.

The price ID is passed as a positional argument.

#### Usage

```bash
aux4 stripe links create <priceId>
```

priceId  The Stripe price ID to create a payment link for (positional argument)

#### Example

```bash
aux4 stripe links create price_abc123
```

This creates a shareable payment link that charges the customer the amount defined by the given price.
