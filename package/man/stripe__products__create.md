#### Description

The `stripe products create` command creates a new product in your Stripe account. You must provide a product name, and can optionally include a description.

The command calls `stripe products create` with the `--name` and `--description` flags. If no description is provided, an empty string is used.

#### Usage

```bash
aux4 stripe products create --name <name> [--description <description>]
```

--name         The product name (required)
--description  A description of the product (default: empty string)

#### Example

```bash
aux4 stripe products create --name "aux4 Pro" --description "Professional plan with unlimited commands"
```
