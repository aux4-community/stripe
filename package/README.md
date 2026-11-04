# community/stripe

Manage Stripe products, prices, payment links, subscriptions, customers, webhooks and revenue from one package. It exposes a generic Stripe API request command for live and sandbox environments.

## Installation

```bash
aux4 aux4 pkger install community/stripe
```

Requires Node.js 22 or later, the [Stripe CLI](https://stripe.com/docs/stripe-cli) and `jq` to be installed. Automatic installation depends on the available package manager. The API command uses its explicitly configured key independently of Stripe CLI login.

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

### Authentication

| Command | Description |
|---|---|
| `aux4 stripe login` | Start the configured Stripe login flow |

### API

| Command | Description |
|---|---|
| `aux4 stripe api request` | Send a JSON-described HTTP request and return its status and body |

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


## API requests

`aux4 stripe api request` accepts a JSON HTTP request on stdin. This command is independent of CLI login and can be used by other packages or scripts.

Create `request.json`:

```json
{
  "method": "POST",
  "path": "/v1/products",
  "data": {
    "name": "Pro",
    "metadata": {
      "team": "billing"
    },
    "images": []
  },
  "idempotencyKey": "a-unique-key-for-this-operation",
  "config": {
    "apiKeyEnv": "STRIPE_DEV_API_KEY",
    "mode": "test",
    "account": ""
  }
}
```

```bash
aux4 stripe api request < request.json
```

Supported methods: GET, POST and DELETE. `path` must be a relative Stripe `/v1/` path. `data` is optional; GET data becomes query parameters, while other methods send Stripe form data. Nested objects, arrays and empty clearing values are preserved. Optional `config.account` sends the connected-account header. Requests use API version `2026-10-28.endive`.

`config.account` defaults to an empty value, which sends no connected-account header. Set it to an `acct_...` ID to target a connected account. `idempotencyKey` is optional; replace the example key with a unique key for each new write and reuse it only when retrying that same write.

The result contains `status` and `body`. For example, a successful response has this shape; `body` contains the full Stripe response:

```json
{
  "status": 200,
  "body": {
    "id": "prod_example",
    "object": "product"
  }
}
```

HTTP errors remain in this envelope so callers can distinguish not-found, authorization and validation failures. Invalid input and transport failures exit nonzero. GET requests and writes with an idempotency key retry transient failures up to twice, using the same key and body. All attempts share a 30-second deadline.

## Environment Variables

The API command reads the key from the environment variable named by `config.apiKeyEnv`. Set `config.mode` to `test` for sandbox keys or `live` for production keys. Secret and restricted keys are supported. The key prefix must match the configured mode. The existing CLI commands continue to use the Stripe CLI's own authentication.
