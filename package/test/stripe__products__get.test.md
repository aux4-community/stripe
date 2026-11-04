# stripe products get

```file:bin/stripe
#!/usr/bin/env node
const args = process.argv.slice(2);
console.log(JSON.stringify({source: 'stripe', args, data: [{source: 'stripe'}]}));
```


## with a simulated Stripe CLI

### should attempt to retrieve a product

```execute
chmod +x bin/stripe && export PATH="$PWD/bin:$PATH" && test "$(command -v stripe)" = "$PWD/bin/stripe" && STRIPE_API_KEY=sk_test_OFFLINE_DO_NOT_USE aux4 stripe products get prod_test123
```

```expect:regex
"source"\s*:\s*"stripe"
```
