#### Description

The `stripe products` command group manages Stripe products. You can list all products, retrieve a specific product by ID, create new products, and update existing ones.

Available subcommands:

- **list** — List all products with configurable limit
- **get** — Retrieve a product by its ID
- **create** — Create a new product with name and description
- **update** — Update an existing product's name

#### Usage

```bash
aux4 stripe products <subcommand>
```

#### Example

```bash
aux4 stripe products list --limit 20
aux4 stripe products get prod_abc123
aux4 stripe products create --name "Pro Plan" --description "Professional tier"
aux4 stripe products update prod_abc123 --name "Enterprise Plan"
```
