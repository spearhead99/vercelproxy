module.exports = async (req, res) => {
  try {
    // Get the outbound IP from ipify
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    
    res.status(200).json({
      name: 'BTCC API Proxy',
      version: '1.0.0',
      outboundIp: ipData.ip,
      note: '⚠️ IMPORTANT: Add this IP to BTCC API Management under "Binding IP address"',
      endpoints: {
        health: '/api/health',
        checkIp: '/api/check-ip',
        balance: '/api/proxy/balance?marketType=spot',
        history: '/api/proxy/history?marketType=spot&symbol=BTC_USDT',
        trade: '/api/proxy/trade'
      },
      btccApi: 'https://api.btcc.com'
    });
  } catch (error) {
    res.status(200).json({
      name: 'BTCC API Proxy',
      version: '1.0.0',
      error: 'Could not fetch IP',
      errorDetails: error.message,
      endpoints: {
        health: '/api/health',
        balance: '/api/proxy/balance?marketType=spot',
        history: '/api/proxy/history?marketType=spot&symbol=BTC_USDT',
        trade: '/api/proxy/trade'
      },
      btccApi: 'https://api.btcc.com'
    });
  }
};
