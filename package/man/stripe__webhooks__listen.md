#### Description

The `stripe webhooks listen` command starts a local webhook listener that forwards Stripe events to a specified local endpoint. This is primarily used during development to test webhook handlers without deploying to a public URL.

The listener establishes a connection with Stripe and forwards all received events to the configured local URL.

#### Usage

```bash
aux4 stripe webhooks listen [--forwardTo <url>]
```

--forwardTo  The local endpoint URL to forward events to (default: http://localhost:3001/v1/billing/events)

#### Example

```bash
aux4 stripe webhooks listen --forwardTo http://localhost:8080/webhooks
```

This starts listening for Stripe events and forwards them to your local server at the specified URL.
