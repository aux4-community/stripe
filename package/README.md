# aux4/stripe

Stripe CLI wrapper for managing products, prices, payment links, subscriptions, customers, webhooks, and monitoring revenue from the command line.

## Installation

```bash
aux4 aux4 pkger install aux4/stripe
```

Requires the [Stripe CLI](https://stripe.com/docs/stripe-cli) and `jq` to be installed. The package will attempt to install them automatically via Homebrew if missing.

## Quick Start

```bash
# Login to Stripe
stripe login

# List your products
aux4 stripe products list

# Check revenue
aux4 stripe revenue summary

# Listen for webhooks locally
aux4 stripe webhooks listen --forwardTo http://localhost:3001/v1/billing/events
```

## Commands

### Products

| Command | Description |
|---------|-------------|
| `aux4 stripe products list` | List all products |
| `aux4 stripe products get <id>` | Get a product by ID |
| `aux4 stripe products create` | Create a new product |
| `aux4 stripe products update <id>` | Update a product |

### Prices

| Command | Description |
|---------|-------------|
| `aux4 stripe prices list <productId>` | List prices for a product |
| `aux4 stripe prices create` | Create a recurring price |

### Payment Links

| Command | Description |
|---------|-------------|
| `aux4 stripe links list` | List payment links |
| `aux4 stripe links create <priceId>` | Create a payment link |

### Subscriptions

| Command | Description |
|---------|-------------|
| `aux4 stripe subscriptions list` | List subscriptions |
| `aux4 stripe subscriptions get <id>` | Get subscription details |
| `aux4 stripe subscriptions cancel <id>` | Cancel a subscription |

### Customers

| Command | Description |
|---------|-------------|
| `aux4 stripe customers list` | List customers |
| `aux4 stripe customers search <email>` | Search by email |

### Webhooks

| Command | Description |
|---------|-------------|
| `aux4 stripe webhooks listen` | Forward events to local endpoint |
| `aux4 stripe webhooks endpoints` | List webhook endpoints |
| `aux4 stripe webhooks trigger <event>` | Trigger a test event |

### Revenue

| Command | Description |
|---------|-------------|
| `aux4 stripe revenue summary` | MRR, ARR, active subscribers |
| `aux4 stripe revenue charges` | List recent charges |
| `aux4 stripe revenue invoices` | List invoices |
| `aux4 stripe revenue balance` | Show Stripe balance |
| `aux4 stripe revenue payouts` | List recent payouts |

## Examples

### Create a product with a monthly price and payment link

```bash
# Create the product
aux4 stripe products create --name "aux4 KB Pro" --description "Knowledge base for teams"

# Create a $5/month price (amount in cents)
aux4 stripe prices create --productId prod_xxx --amount 500

# Create a payment link
aux4 stripe links create price_xxx
```

### Monitor revenue

```bash
# Quick summary
aux4 stripe revenue summary

# Check balance
aux4 stripe revenue balance

# Recent payouts
aux4 stripe revenue payouts
```

### Test webhooks locally

```bash
# Start listening (forwards to local API)
aux4 stripe webhooks listen

# In another terminal, trigger a test event
aux4 stripe webhooks trigger checkout.session.completed
```
