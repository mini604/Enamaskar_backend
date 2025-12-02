const express = require("express");
const router = express.Router();
const queue = require("../server/queue"); // Bull queue instance

router.post("/", async (req, res) => {
  try {
    // Validate request body
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid request body. Expected an object with frames data." 
      });
    }

    // Add job to queue with proper error handling
    const job = await queue.add(req.body, {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
    });
    
    res.json({ success: true, jobId: job.id });
  } catch (err) {
    console.error("Error adding job to queue:", err);
    res.status(500).json({ 
      success: false, 
      error: "Failed to queue video",
      details: err.message 
    });
  }
});

module.exports = router;
