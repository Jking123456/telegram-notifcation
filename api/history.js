const axios = require('axios');

module.exports = async (req, res) => {
  // Use your actual API Key and Job ID
  const API_KEY = 'asVdr6fswV9XT+aZXFPOWM0e5NpgDCvW2QK8n3F1NB4='; 
  const JOB_ID = '7076160';

  const headers = { 'Authorization': `Bearer ${API_KEY}` };

  // HANDLE TOGGLE REQUEST (POST)
  if (req.method === 'POST') {
    try {
      const { enabled } = req.body;
      await axios.patch(`https://api.cron-job.org/jobs/${JOB_ID}`, 
        { enabled: enabled },
        { headers }
      );
      return res.status(200).json({ success: true });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Failed to toggle job" });
    }
  }

  // HANDLE DATA REFRESH (GET)
  try {
    const jobRes = await axios.get(`https://api.cron-job.org/jobs/${JOB_ID}`, { headers });
    const histRes = await axios.get(`https://api.cron-job.org/jobs/${JOB_ID}/history`, { headers });

    res.status(200).json({
      enabled: jobRes.data.job.enabled,
      history: histRes.data.history || []
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from cron-job.org" });
  }
};
