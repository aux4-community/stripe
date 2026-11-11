import { requestAPI } from './api.mjs';
import { spawnSync } from 'node:child_process';

function stripeCLI(mode, dataOnly, args) {
  if (!['test', 'live'].includes(mode)) throw new Error('Stripe CLI mode must be test or live');
  const cliArgs = [...args];
  if (mode === 'live') cliArgs.push('--live');
  const result = spawnSync('stripe', cliArgs, { encoding: 'utf8' });
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.error) {
    if (result.stdout) process.stdout.write(result.stdout);
    throw new Error(`Unable to run Stripe CLI: ${result.error.message}`);
  }
  if (result.status !== 0) {
    if (result.stdout) process.stdout.write(result.stdout);
    process.exitCode = result.status ?? 1;
    return;
  }
  if (!dataOnly) { if (result.stdout) process.stdout.write(result.stdout); return; }
  if (dataOnly) {
    let parsed;
    try { parsed = JSON.parse(result.stdout); } catch { throw new Error('Stripe CLI returned invalid JSON'); }
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.data)) throw new Error('Stripe CLI response did not contain a data array');
    process.stdout.write(JSON.stringify(parsed.data));
  }
}

try {
  if (process.argv[2] === 'stripe') {
    const mode = process.argv[3];
    const dataOnly = process.argv[4] === '--data';
    stripeCLI(mode, dataOnly, process.argv.slice(dataOnly ? 5 : 4));
  } else if (process.argv[2] === 'revenue-summary') {
    const subscriptions = JSON.parse(process.argv[3]).data;
    if (!Array.isArray(subscriptions)) throw new Error('Stripe subscriptions response must contain a data array');
    const mrr = subscriptions.reduce((sum, subscription) => sum + Number(subscription.plan?.amount ?? 0), 0) / 100;
    console.log(`=== Revenue Summary ===\nActive Subscriptions: ${subscriptions.length}\nMRR: $${mrr}\nARR: $${mrr * 12}`);
  } else {
  if (process.argv[2] !== 'api-request') throw new Error('Unknown Stripe command');
  const chunks = []; let size = 0;
  for await (const data of process.stdin) {
    size += data.length;
    if (size > 16 * 1024 * 1024) throw new Error('API request too large');
    chunks.push(data);
  }
  const request = JSON.parse(Buffer.concat(chunks).toString());
  console.log(JSON.stringify(await requestAPI(request), null, 2));
  }
} catch (error) { console.error(`Error: ${error.message}`); process.exitCode = 1; }
