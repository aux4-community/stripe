#### Description

The `create-metered` command creates a recurring price whose billed quantity comes from the specified Billing Meter. The meter must already exist and be active. Amount is expressed in the currency's smallest unit; for USD, 1000 means $10.00 per meter unit and billing interval.

#### Usage

```bash
aux4 stripe prices create-metered <productId> --meterId <meterId> --amount <cents> [--currency <code>] [--interval <month|year>] [--mode <test|live>]
```

--productId  Stripe product ID
--meterId    Billing Meter ID
--amount     Amount in currency minor units per meter unit
--currency   Currency code (default: usd)
--interval   Billing interval (default: month)
--mode       Stripe CLI mode (default: test)

#### Example

```bash
aux4 stripe prices create-metered prod_cloud --meterId mtr_cloud_sm --amount 1000 --interval month
```

Use `--mode live` only when intentionally creating a production price:

```bash
aux4 stripe prices create-metered prod_cloud --meterId mtr_cloud_live --amount 1000 --mode live
```

