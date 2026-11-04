import { test } from 'node:test';
import assert from 'node:assert/strict';
import { requestAPI } from '../src/api.mjs';
const config = { apiKeyEnv: 'TEST_KEY', mode: 'test' };
const request = extra => ({ method: 'GET', path: '/v1/account', config, ...extra });
function mock(responses) {
  const calls = [];
  return { env: { TEST_KEY: 'sk_test_fake' }, calls, fetchImpl: async (url, options) => {
    calls.push({ url, ...options, form: new URLSearchParams(options.body) });
    const next = responses.shift(); assert(next, 'Unexpected HTTP request');
    if (next instanceof Error) throw next;
    return { status: next.status ?? 200, json: async () => next.body ?? next };
  } };
}
test('supports live, sandbox, restricted and connected-account keys', async () => {
  for (const [key, mode] of [['sk_live_fake', 'live'], ['rk_live_fake', 'live'], ['sk_test_fake', 'test'], ['rk_test_fake', 'test']]) {
    const m = mock([{ id: 'acct_target' }]); m.env.TEST_KEY = key;
    assert.equal((await requestAPI(request({ config: { ...config, mode, account: 'acct_target' } }), m)).body.id, 'acct_target');
    assert.equal(m.calls[0].headers['Stripe-Account'], 'acct_target');
  }
});
test('rejects missing keys and mismatched modes before any HTTP request', async () => {
  await assert.rejects(requestAPI(request(), { env: {} }), /Missing Stripe/);
  await assert.rejects(requestAPI(request(), { env: { TEST_KEY: 'sk_live_fake' } }), /does not match/);
});
test('encodes arbitrary nested objects, arrays and empty clearing values', async () => {
  const m = mock([{ id: 'prod_new' }]);
  await requestAPI(request({ method: 'POST', path: '/v1/products', idempotencyKey: 'key', data: { name: 'Pro', metadata: { team: 'billing', old: '' }, images: [], marketing_features: [{ name: 'Projects' }] } }), m);
  assert.equal(m.calls[0].form.get('marketing_features[0][name]'), 'Projects');
  assert.equal(m.calls[0].form.get('metadata[old]'), '');
  assert.equal(m.calls[0].form.get('images'), '');
  assert.equal(m.calls[0].headers['Idempotency-Key'], 'key');
});
test('GET data becomes query parameters and HTTP errors remain distinguishable', async () => {
  const m = mock([{ status: 404, body: { error: { code: 'resource_missing' } } }]);
  const result = await requestAPI(request({ path: '/v1/customers', data: { limit: 10 } }), m);
  assert(m.calls[0].url.endsWith('/v1/customers?limit=10'));
  assert.equal(result.status, 404);
  assert.equal(result.body.error.code, 'resource_missing');
});
test('retries identical idempotent requests and rejects external API hosts', async () => {
  const m = mock([new Error('network'), { id: 'prod_new' }]);
  await requestAPI(request({ method: 'POST', path: '/v1/products', data: { name: 'Pro' }, idempotencyKey: 'stable' }), m);
  assert.equal(m.calls.length, 2);
  assert.equal(m.calls[0].body, m.calls[1].body);
  assert.equal(m.calls[0].headers['Idempotency-Key'], m.calls[1].headers['Idempotency-Key']);
  await assert.rejects(requestAPI(request({ path: 'https://other.example/v1/account' }), mock([])), /Stripe \/v1\//);
});
