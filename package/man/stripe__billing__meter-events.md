#### Description

The `meter-events` command records usage for an active Stripe Billing Meter. Use a unique, stable identifier for each usage event so retrying the same operation does not create a second event. The event timestamp is Unix time in seconds. Stripe CLI uses test mode by default; select live mode with `--mode live`.

This helper sends `stripe_customer_id` and `value` payload fields, matching the meter created by `aux4 stripe billing meters create`.

#### Usage

```bash
aux4 stripe billing meter-events create <eventName> --identifier <id> --timestamp <unixTime> --customerId <cus_id> --value <number> [--mode <test|live>]
```

--eventName   Meter event name
--identifier  Unique event identifier
--timestamp   Unix timestamp in seconds
--customerId  Stripe customer ID
--value       Numeric usage amount
--mode        Stripe CLI mode (default: test)

#### Example

```bash
aux4 stripe billing meter-events create aux4_cloud_machine_day_sm --identifier dev-smoke-001 --timestamp 1793836800 --customerId cus_test123 --value 1
```

