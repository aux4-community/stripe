# stripe billing meters and metered prices

```file:bin/stripe
#!/usr/bin/env node
const args = process.argv.slice(2);
if (process.env.STRIPE_STUB_FAIL === '1') {
  console.log('partial failure output');
  console.error('Stripe authentication failed');
  process.exit(7);
}
if (process.env.STRIPE_STUB_INVALID === '1') console.log('not-json');
else console.log(JSON.stringify({args, data: [{id: 'mtr_stub'}]}));
```

## with an offline Stripe CLI stub

### should preserve quoted meter values and select live mode

```execute
chmod +x bin/stripe && export PATH="$PWD/bin:$PATH" && STRIPE_API_KEY=sk_test_OFFLINE_DO_NOT_USE aux4 stripe billing meters create "Cloud day's usage" --eventName "cloud;event" --mode live
```

```expect:regex
"args":\["billing","meters","create","--display-name","Cloud day's usage","--event-name","cloud;event","--default-aggregation.formula","sum","--customer-mapping.type","by_id","--customer-mapping.event-payload-key","stripe_customer_id","--value-settings.event-payload-key","value","--confirm","--color","off","--live"\]
```

### should list meters in test mode without a live flag

```execute
chmod +x bin/stripe && export PATH="$PWD/bin:$PATH" && STRIPE_API_KEY=sk_test_OFFLINE_DO_NOT_USE aux4 stripe billing meters list --limit 3 --mode test
```

```expect:regex
\[\{"id":"mtr_stub"\}\]
```

### should retrieve a meter with exact test-mode argv

```execute
chmod +x bin/stripe && export PATH="$PWD/bin:$PATH" && STRIPE_API_KEY=sk_test_OFFLINE_DO_NOT_USE aux4 stripe billing meters get mtr_stub --mode test
```

```expect:regex
"args":\["billing","meters","retrieve","mtr_stub","--color","off"\]
```

### should update a meter with exact test-mode argv

```execute
chmod +x bin/stripe && export PATH="$PWD/bin:$PATH" && STRIPE_API_KEY=sk_test_OFFLINE_DO_NOT_USE aux4 stripe billing meters update mtr_stub --displayName "Renamed meter" --mode test
```

```expect:regex
"args":\["billing","meters","update","mtr_stub","--display-name","Renamed meter","--color","off"\]
```

### should deactivate and reactivate with exact test-mode argv

```execute
chmod +x bin/stripe && export PATH="$PWD/bin:$PATH" && STRIPE_API_KEY=sk_test_OFFLINE_DO_NOT_USE aux4 stripe billing meters deactivate mtr_stub --mode test && aux4 stripe billing meters reactivate mtr_stub --mode test
```

```expect:regex
"args":\["billing","meters","deactivate","mtr_stub","--color","off"\][\s\S]*"args":\["billing","meters","reactivate","mtr_stub","--color","off"\]
```

### should cover meter list output while exercising all lifecycle commands

```execute
chmod +x bin/stripe && export PATH="$PWD/bin:$PATH" && STRIPE_API_KEY=sk_test_OFFLINE_DO_NOT_USE aux4 stripe billing meters list --limit 3 && aux4 stripe billing meters get mtr_stub && aux4 stripe billing meters update mtr_stub --displayName "Renamed meter" && aux4 stripe billing meters deactivate mtr_stub && aux4 stripe billing meters reactivate mtr_stub
```

```expect:partial
[{"id":"mtr_stub"}]
```

### should link a metered price to the selected meter

```execute
chmod +x bin/stripe && export PATH="$PWD/bin:$PATH" && STRIPE_API_KEY=sk_test_OFFLINE_DO_NOT_USE aux4 stripe prices create-metered prod_stub --meterId mtr_stub --amount 25 --mode live
```

```expect:regex
"args":\["prices","create","--product","prod_stub","--unit-amount","25","--currency","usd","--recurring.interval","month","--recurring.usage-type","metered","--recurring.meter","mtr_stub","--live"\]
```

### should encode a meter event without shell interpretation

```execute
chmod +x bin/stripe && export PATH="$PWD/bin:$PATH" && STRIPE_API_KEY=sk_test_OFFLINE_DO_NOT_USE aux4 stripe billing meter-events create usage-event --identifier "event id;1" --timestamp 1700000000 --customerId cus_stub --value "2;3" --mode live
```

```expect:regex
"args":\["billing","meter_events","create","--event-name","usage-event","--identifier","event id;1","--timestamp","1700000000","-d","payload\[stripe_customer_id\]=cus_stub","-d","payload\[value\]=2;3","--color","off","--live"\]
```

### should propagate Stripe failures and diagnostics

```execute
chmod +x bin/stripe && export PATH="$PWD/bin:$PATH" && STRIPE_STUB_FAIL=1 STRIPE_API_KEY=sk_test_OFFLINE_DO_NOT_USE aux4 stripe billing meters list
```

```error:partial
Stripe authentication failed
```

### should preserve non-JSON failure output and exit nonzero

```execute
chmod +x bin/stripe && export PATH="$PWD/bin:$PATH" && STRIPE_STUB_FAIL=1 STRIPE_API_KEY=sk_test_OFFLINE_DO_NOT_USE aux4 stripe billing meters list
```

```expect:partial
partial failure output
```

```error:partial
Stripe authentication failed
```

### should reject invalid JSON on a successful list

```execute
chmod +x bin/stripe && export PATH="$PWD/bin:$PATH" && STRIPE_STUB_INVALID=1 STRIPE_API_KEY=sk_test_OFFLINE_DO_NOT_USE aux4 stripe billing meters list
```

```error:partial
Stripe CLI returned invalid JSON
```

### should reject an invalid mode before invoking Stripe

```execute
chmod +x bin/stripe && export PATH="$PWD/bin:$PATH" && STRIPE_API_KEY=sk_test_OFFLINE_DO_NOT_USE aux4 stripe billing meters get mtr_stub --mode invalid
```

```error:partial
Stripe CLI mode must be test or live
```
