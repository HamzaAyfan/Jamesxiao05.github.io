exports.handler = async function(event, context) {
  const headers = event.headers;

  // Get real IP from x-forwarded-for header or fallback
  const ip = headers['x-forwarded-for'] || headers['X-Forwarded-For'] || 'unknown';

  const userAgent = headers['user-agent'] || 'unknown';
  const url = event.queryStringParameters && event.queryStringParameters.page_url || 'unknown';
  const referrer = headers['referer'] || headers['referrer'] || 'unknown';

  const timestamp = new Date().toISOString();

  console.log(`[TRAP HIT] ${timestamp} IP: ${ip} UA: ${userAgent} URL: ${url} Referrer: ${referrer}`);

  // Return a simple Access Denied page
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: `<html><body><h1>Access Denied</h1></body></html>`
  };
};
