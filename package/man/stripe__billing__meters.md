#### Description

The `meters` command group lists, creates, updates, deactivates, and reactivates Stripe Billing Meters. Newly created meters map the event payload's `stripe_customer_id` field to the Stripe customer and the `value` field to measured usage by default. Meter event names and aggregation settings define the meter's usage semantics; Stripe permits only the display name to be edited after creation.

Stripe CLI operations default to test mode. Select live mode explicitly with `--mode live`; the wrapper appends Stripe CLI's `--live` flag as a separate argument, preserving values containing spaces, quotes, or shell metacharacters. Live mode requires a Stripe CLI login with live access.

#### Usage

```bash
aux4 stripe billing meters list [--limit <count>] [--mode <test|live>]
aux4 stripe billing meters get <meterId> [--mode <test|live>]
aux4 stripe billing meters create --displayName <name> --eventName <event> [--formula <sum|count|last>] [--mode <test|live>]
aux4 stripe billing meters update <meterId> --displayName <name> [--mode <test|live>]
aux4 stripe billing meters deactivate <meterId> [--mode <test|live>]
aux4 stripe billing meters reactivate <meterId> [--mode <test|live>]
```

--meterId     Stripe Billing Meter ID
--displayName Meter name shown in Stripe
--eventName   Stable event name recorded by your application
--formula     Aggregation formula (default: sum)
--customerKey Event payload key containing the Stripe customer ID (default: stripe_customer_id)
--valueKey    Event payload key containing the measured value (default: value)
--mode        Stripe CLI mode (default: test; use live only for intentional live-resource operations)

#### Example

```bash
aux4 stripe billing meters create --displayName "Cloud machine days" --eventName aux4_cloud_machine_day_sm --formula sum
```

To operate on live meters, select the mode explicitly:

```bash
aux4 stripe billing meters get mtr_live123 --mode live
```

