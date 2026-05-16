#### Description

The `stripe subscriptions list` command lists subscriptions in your Stripe account. You can filter by status to see active, past due, canceled, or all subscriptions.

By default, only active subscriptions are shown. Use the `--status` flag to change the filter.

#### Usage

```bash
aux4 stripe subscriptions list [--limit <number>] [--status <status>]
```

--limit   Number of subscriptions to list (default: 10)
--status  Filter by subscription status: active, past_due, canceled, or all (default: active)

#### Example

```bash
aux4 stripe subscriptions list --limit 50 --status past_due
```
