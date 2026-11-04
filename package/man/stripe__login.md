#### Description

The `login` command authenticates with your Stripe account. It opens your default browser where you confirm access, then stores the API key locally for all subsequent commands.

Alternatively, you can skip the interactive login by setting the `STRIPE_API_KEY` environment variable directly.

#### Usage

```bash
aux4 stripe login
```

#### Example

```bash
aux4 stripe login
```

```text
Your pairing code is: enjoy-cozy-knit-half
This pairing code verifies your authentication with Stripe.
Press Enter to open the browser...
> Done! The Stripe CLI is configured.
```
