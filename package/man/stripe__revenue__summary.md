#### Description

The `stripe revenue summary` command calculates and displays key revenue metrics. It fetches active subscriptions and computes:

- **Active Subscriptions** — The count of currently active subscriptions
- **MRR (Monthly Recurring Revenue)** — The total monthly revenue from active subscriptions
- **ARR (Annual Recurring Revenue)** — MRR multiplied by 12

The command retrieves up to 100 active subscriptions with expanded plan data and calculates totals from the plan amounts.

**Note:** This command requires `jq` and `bc` for calculations. The MRR calculation uses the plan amount field, which represents the per-unit price in cents divided by 100.

#### Usage

```bash
aux4 stripe revenue summary
```

#### Example

```bash
aux4 stripe revenue summary
```

```text
=== Revenue Summary ===
Active Subscriptions: 42
MRR: $2100
ARR: $25200
```
