module.exports = (req, res) => {
  res.status(200).json({
    name: 'BTCC API Proxy',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      balance: '/api/proxy/balance?marketType=spot',
      history: '/api/proxy/history?marketType=spot&symbol=BTC_USDT',
      trade: '/api/proxy/trade'
    },
    btccApi: 'https://api.btcc.com'
  });
};
