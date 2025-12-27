const axios = require('axios');

module.exports = async (req, res) => {
  const axiosInstance = axios.create({
    timeout: 55000 // 55 seconds (leaving 5s safety margin for Vercel)
  });

  try {
    const response = await axiosInstance.post('https://axhfreeboosting.axelhosting.xyz/api/boost', {
      url: "https://www.facebook.com/profile.php?id=61583017822517", 
      service_type: "facebook_boost"
    });

    return res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    // This catches both internal site slowness and Vercel hitting its limit
    return res.status(500).json({ success: false, error: "Service took too long" });
  }
};
