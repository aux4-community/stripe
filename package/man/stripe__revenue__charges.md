#### Description

The `stripe revenue charges` command lists recent charges in your Stripe account. By default, it shows charges from the last 30 days.

You can control the number of results with `--limit` and the time range with `--since` (a Unix timestamp).

#### Usage

```bash
aux4 stripe revenue charges [--limit <number>] [--since <unix-timestamp>]
```

--limit  Number of charges to list (default: 25)
--since  Unix timestamp to filter from (default: 30 days ago)

#### Example

```bash
aux4 stripe revenue charges --limit 50
```
