module.exports = async (req, res) => {
  // Enable CORS
  const allowedOrigins = [
    'http://localhost:3000',
    'https://btcc-trading-app-qnfona.abacusai.app'
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, API-KEY, API-SIGNATURE, API-TIMESTAMP');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Get the proxy path from query
    const { path } = req.query;
    if (!path) {
      return res.status(400).json({ error: 'Missing path parameter' });
    }

    const btccBaseUrl = 'https://api.btcc.com';
    const queryString = Object.keys(req.query)
      .filter(key => key !== 'path')
      .map(key => `${key}=${req.query[key]}`)
      .join('&');
    
    const targetUrl = `${btccBaseUrl}/${path}${queryString ? '?' + queryString : ''}`;

    console.log(`📡 Proxying ${req.method} request to: ${targetUrl}`);

    // Forward headers
    const headers = {};
    if (req.headers['api-key']) headers['API-KEY'] = req.headers['api-key'];
    if (req.headers['api-signature']) headers['API-SIGNATURE'] = req.headers['api-signature'];
    if (req.headers['api-timestamp']) headers['API-TIMESTAMP'] = req.headers['api-timestamp'];
    if (req.headers['content-type']) headers['Content-Type'] = req.headers['content-type'];

    // Make request to BTCC API
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' && req.body ? JSON.stringify(req.body) : undefined,
      signal: controller.signal
    });

    clearTimeout(timeout);

    // Get response data
    const data = await response.text();
    
    console.log(`✅ BTCC API responded: ${response.status}`);

    // Forward response
    res.status(response.status);
    
    // Forward response headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.send(data);

  } catch (error) {
    console.error('❌ Proxy error:', error.message);
    res.status(500).json({
      error: 'Proxy request failed',
      message: error.message,
      details: 'Could not reach BTCC API'
    });
  }
};
