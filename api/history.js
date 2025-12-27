const axios = require('axios');

module.exports = async (req, res) => {
  const API_KEY = 'asVdr6fswV9XT+aZXFPOWM0e5NpgDCvW2QK8n3F1NB4=';
  const JOB_ID = 'PASTE_YOUR_JOB_ID_HERE';

  try {
    const response = await axios.get(`https://api.cron-job.org/jobs/${JOB_ID}/history`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });

    // We only send back the history list to the browser
    res.status(200).json(response.data.history || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
};
