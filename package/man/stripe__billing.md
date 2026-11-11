#### Description

The `billing` command group manages Stripe Billing Meters and their usage events. A meter defines an event name, how values are aggregated, and which event payload fields identify the customer and quantity.

#### Usage

```bash
aux4 stripe billing <meters|meter-events> <command>
```

#### Example

```bash
aux4 stripe billing meters list
aux4 stripe billing meter-events create aux4_cloud_machine_day_sm --identifier dev-smoke-001 --timestamp 1793836800 --customerId cus_test123 --value 1
```

