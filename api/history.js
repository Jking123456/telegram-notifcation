const axios = require('axios');

module.exports = async (req, res) => {
  const API_KEY = 'p/fvJNB/9gj0bTMiySF7TtAOI9Ws0mQUTa9u40j91bQ=';
  const JOB_ID = '7076160';
  
  const headers = { 
    'Authorization': `Bearer ${API_KEY.trim()}`,
    'Accept': 'application/json'
  };

  try {
    // We only try to get history for this test to keep it simple
    const response = await axios.get(`https://api.cron-job.org/jobs/${JOB_ID}/history`, { 
      headers,
      timeout: 5000 // If no response in 5 seconds, stop trying
    });

    res.status(200).json({
      enabled: true, // Placeholder until we confirm connection works
      history: response.data.history || []
    });

  } catch (error) {
    res.status(500).json({ 
      debug_error: "CONNECTION_FAILED",
      message: error.message,
      code: error.code // This will tell us if it's a TIMEOUT or DNS error
    });
  }
};
