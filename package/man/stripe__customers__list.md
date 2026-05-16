#### Description

The `stripe customers list` command lists customers in your Stripe account. It returns the most recent customers, ordered by creation date.

Use the `--limit` flag to control the number of results returned.

#### Usage

```bash
aux4 stripe customers list [--limit <number>]
```

--limit  Number of customers to list (default: 10)

#### Example

```bash
aux4 stripe customers list --limit 50
```
