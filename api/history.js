const axios = require('axios');

module.exports = async (req, res) => {
  const API_KEY = 'p/fvJNB/9gj0bTMiySF7TtAOI9Ws0mQUTa9u40j91bQ=';
  const JOB_ID = '7076160';
  
  const headers = { 
    'Authorization': `Bearer ${API_KEY.trim()}`,
    'Content-Type': 'application/json'
  };

  // 1. HANDLE TOGGLE (POST REQUEST)
  if (req.method === 'POST') {
    try {
      const { enabled } = req.body;
      await axios.patch(`https://api.cron-job.org/jobs/${JOB_ID}`, { enabled }, { headers });
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ error: "Failed to toggle status" });
    }
  }

  // 2. HANDLE DATA FETCH (GET REQUEST)
  try {
    const [jobRes, histRes] = await Promise.all([
      axios.get(`https://api.cron-job.org/jobs/${JOB_ID}`, { headers }),
      axios.get(`https://api.cron-job.org/jobs/${JOB_ID}/history`, { headers })
    ]);

    res.status(200).json({
      enabled: jobRes.data.job.enabled,
      history: histRes.data.history || []
    });
  } catch (error) {
    res.status(500).json({ 
      error: "API Connection Error",
      details: error.message 
    });
  }
};
