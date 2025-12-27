const axios = require('axios');

module.exports = async (req, res) => {
  const API_KEY = 'p/fvJNB/9gj0bTMiySF7TtAOI9Ws0mQUTa9u40j91bQ=';
  const JOB_ID = '7076160';
  const headers = { 'Authorization': `Bearer ${API_KEY.trim()}` };

  try {
    const jobRes = await axios.get(`https://api.cron-job.org/jobs/${JOB_ID}`, { headers });
    const histRes = await axios.get(`https://api.cron-job.org/jobs/${JOB_ID}/history`, { headers });

    res.status(200).json({
      enabled: jobRes.data?.job?.enabled || false,
      history: histRes.data?.history || []
    });
  } catch (error) {
    res.status(500).json({ error: "Connection Error" });
  }
};
