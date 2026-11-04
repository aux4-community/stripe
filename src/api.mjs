function assert(condition, message) { if (!condition) throw new Error(message); }
export function form(value, prefix = '', result = new URLSearchParams()) {
  if (value === null || value === undefined) { if (prefix) result.append(prefix, ''); }
  else if (typeof value === 'object') {
    if (!Object.keys(value).length && prefix) result.append(prefix, '');
    else for (const [key, child] of Object.entries(value)) form(child, prefix ? `${prefix}[${key}]` : key, result);
  } else result.append(prefix, String(value));
  return result;
}
export async function requestAPI(request, { fetchImpl = fetch, env = process.env } = {}) {
  assert(['GET', 'POST', 'DELETE'].includes(request.method), 'method must be GET, POST or DELETE');
  assert(typeof request.path === 'string' && /^\/v1\/[A-Za-z0-9_/-]+$/.test(request.path), 'path must be a Stripe /v1/ API path');
  assert(request.data === undefined || (request.data !== null && typeof request.data === 'object' && !Array.isArray(request.data)), 'data must be an object');
  const config = request.config ?? {};
  for (const key of Object.keys(config)) assert(['apiKeyEnv', 'mode', 'account'].includes(key), `Unknown Stripe config: ${key}`);
  assert(typeof config.apiKeyEnv === 'string' && /^[A-Za-z_][A-Za-z0-9_]*$/.test(config.apiKeyEnv), 'config.apiKeyEnv must name an environment variable');
  assert(['test', 'live'].includes(config.mode), 'config.mode must be test or live');
  const key = env[config.apiKeyEnv];
  assert(key, `Missing Stripe API key in ${config.apiKeyEnv}`);
  assert(/^(?:sk|rk)_(test|live)_/.exec(key)?.[1] === config.mode, 'Stripe API key does not match the configured test/live mode');
  if (config.account) assert(/^acct_[A-Za-z0-9]+$/.test(config.account), 'Invalid Stripe connected account ID');
  if (request.idempotencyKey !== undefined) assert(typeof request.idempotencyKey === 'string' && request.idempotencyKey.length > 0 && request.idempotencyKey.length <= 255 && !/[\r\n]/.test(request.idempotencyKey), 'Invalid idempotency key');
  const headers = { Authorization: `Bearer ${key}`, 'Stripe-Version': '2026-10-28.endive' };
  if (config.account) headers['Stripe-Account'] = config.account;
  if (request.idempotencyKey) headers['Idempotency-Key'] = request.idempotencyKey;
  const options = { method: request.method, headers, signal: AbortSignal.timeout(30000) };
  const encoded = request.data ? form(request.data).toString() : '';
  let url = `https://api.stripe.com${request.path}`;
  if (request.method === 'GET' && encoded) url += `?${encoded}`;
  else if (encoded) { headers['Content-Type'] = 'application/x-www-form-urlencoded'; options.body = encoded; }
  let response;
  for (let attempt = 0; ; attempt++) {
    try { response = await fetchImpl(url, options); }
    catch { if (attempt < 2 && (request.method === 'GET' || request.idempotencyKey)) continue; throw new Error('Stripe request failed; retry with the same idempotency key'); }
    if ((response.status === 429 || response.status >= 500) && attempt < 2 && (request.method === 'GET' || request.idempotencyKey)) {
      await new Promise(resolve => setTimeout(resolve, 250 * (attempt + 1))); continue;
    }
    break;
  }
  let body;
  try { body = await response.json(); } catch { throw new Error(`Stripe returned invalid JSON (${response.status})`); }
  return { status: response.status, body };
}
