#### Description

The `stripe subscriptions cancel` command cancels an active subscription. It prompts for confirmation before proceeding and prorates the final charge.

The cancellation is immediate and the subscription will not renew. The `--prorate` flag is applied automatically so the customer receives credit for unused time.

You can bypass the confirmation prompt with `--yes`.

#### Usage

```bash
aux4 stripe subscriptions cancel <subscriptionId>
```

subscriptionId  The Stripe subscription ID to cancel (positional argument)

#### Example

```bash
aux4 stripe subscriptions cancel sub_abc123
```

```text
Cancel subscription sub_abc123? (y/n)
```
