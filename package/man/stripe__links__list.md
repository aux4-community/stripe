#### Description

The `stripe links list` command lists all payment links in your Stripe account. Payment links are shareable URLs that direct customers to a hosted checkout page.

You can control the number of results with the `--limit` flag.

#### Usage

```bash
aux4 stripe links list [--limit <number>]
```

--limit  Number of payment links to list (default: 10)

#### Example

```bash
aux4 stripe links list --limit 20
```
