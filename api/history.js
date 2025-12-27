const axios = require('axios');

module.exports = async (req, res) => {
  const API_KEY = 'p/fvJNB/9gj0bTMiySF7TtAOI9Ws0mQUTa9u40j91bQ=';
  const JOB_ID = '7076160';
  const headers = { 'Authorization': `Bearer ${API_KEY.trim()}` };

  try {
    const histRes = await axios.get(`https://api.cron-job.org/jobs/${JOB_ID}/history`, { headers });

    res.status(200).json({
      history: histRes.data?.history || []
    });
  } catch (error) {
    // This sends the EXACT error from cron-job.org to your screen
    res.status(500).json({ 
      error: "Connection Error",
      reason: error.response ? error.response.data : error.message,
      status: error.response ? error.response.status : "No Response"
    });
  }
};
