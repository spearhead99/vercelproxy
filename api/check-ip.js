module.exports = async (req, res) => {
  try {
    // Check outbound IP by calling an IP detection service
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    
    res.status(200).json({
      outboundIp: data.ip,
      note: "This is the IP address Vercel uses for outbound requests"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
