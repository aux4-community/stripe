#### Description

Read a JSON HTTP request from stdin and return an object containing the HTTP status and unmodified Stripe response body. This command accepts method (GET, POST or DELETE), path (a relative /v1/ API path), optional data, optional idempotencyKey and config. Config requires apiKeyEnv and mode (test or live); account optionally targets a connected account.

GET data is encoded into query parameters. POST and DELETE data uses Stripe form encoding, including nested objects, arrays and empty values. Network errors, HTTP 429 and server errors are retried for GET requests or requests with an idempotency key. Repeated attempts use the identical body and key.

HTTP errors, including 404 and 401, are returned in the status/body envelope. The command exits nonzero for invalid configuration, malformed requests or transport failures. Credentials are read only from the configured environment variable and are never included in the output. All attempts share a 30-second deadline, with up to two retries. An empty or omitted config.account sends no connected-account header. Use a new idempotency key for a new write, and reuse it only for the same write.

#### Usage

```bash
aux4 stripe api request < request.json
```

#### Example

Create request.json:

```json
{
  "method": "GET",
  "path": "/v1/account",
  "config": {
    "apiKeyEnv": "STRIPE_DEV_API_KEY",
    "mode": "test"
  }
}
```

```bash
aux4 stripe api request < request.json
```

A successful response has this shape; body contains the full Stripe response:

```json
{
  "status": 200,
  "body": {
    "id": "acct_example",
    "object": "account"
  }
}
```
