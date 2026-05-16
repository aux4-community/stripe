#### Description

The `stripe customers search` command searches for customers by email address. It uses the Stripe search API with an email query to find matching customer records.

The email is passed as a positional argument.

#### Usage

```bash
aux4 stripe customers search <email>
```

email  The email address to search for (positional argument)

#### Example

```bash
aux4 stripe customers search user@example.com
```
