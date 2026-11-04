import { requestAPI } from './api.mjs';

try {
  if (process.argv[2] === 'revenue-summary') {
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
