#### Description

The `meters` command group lists, creates, updates, deactivates, and reactivates Stripe Billing Meters. Newly created meters map the event payload's `stripe_customer_id` field to the Stripe customer and the `value` field to measured usage by default. Meter event names and aggregation settings define the meter's usage semantics; Stripe permits only the display name to be edited after creation.

Stripe CLI operations use its current mode. It defaults to test mode; pass the Stripe CLI `--live` option only when intentionally operating on live resources.

#### Usage

```bash
aux4 stripe billing meters list [--limit <count>]
aux4 stripe billing meters get <meterId>
aux4 stripe billing meters create --displayName <name> --eventName <event> [--formula <sum|count|last>]
aux4 stripe billing meters update <meterId> --displayName <name>
aux4 stripe billing meters deactivate <meterId>
aux4 stripe billing meters reactivate <meterId>
```

--meterId     Stripe Billing Meter ID
--displayName Meter name shown in Stripe
--eventName   Stable event name recorded by your application
--formula     Aggregation formula (default: sum)
--customerKey Event payload key containing the Stripe customer ID (default: stripe_customer_id)
--valueKey    Event payload key containing the measured value (default: value)

#### Example

```bash
aux4 stripe billing meters create --displayName "Cloud machine days" --eventName aux4_cloud_machine_day_sm --formula sum
```

