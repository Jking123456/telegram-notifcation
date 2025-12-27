const axios = require('axios');

module.exports = async (req, res) => {
  const API_KEY = 'p/fvJNB/9gj0bTMiySF7TtAOI9Ws0mQUTa9u40j91bQ=';
  const JOB_ID = '7076160';
  
  // .trim() ensures no accidental spaces at the end are sent to the API
  const headers = { 'Authorization': `Bearer ${API_KEY.trim()}` };

  try {
    const jobDetail = await axios.get(`https://api.cron-job.org/jobs/${JOB_ID}`, { headers });
    const jobHistory = await axios.get(`https://api.cron-job.org/jobs/${JOB_ID}/history`, { headers });

    res.status(200).json({
      enabled: jobDetail.data.job.enabled,
      history: jobHistory.data.history || []
    });
  } catch (error) {
    // This sends the REAL error from cron-job.org to your browser screen
    res.status(error.response ? error.response.status : 500).json({ 
      debug_error: "API REJECTED",
      server_message: error.response ? error.response.data : "No response from server",
      status_code: error.response ? error.response.status : "Unknown"
    });
  }
};
