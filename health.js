module.exports = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'BTCC API Proxy is running',
    timestamp: new Date().toISOString()
  });
};
