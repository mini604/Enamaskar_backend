const express = require("express");
const router = express.Router();
const queue = require("../server/queue"); // Bull queue instance

router.post("/", async (req, res) => {
  try {
    const job = await queue.add(req.body);
    res.json({ success: true, jobId: job.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to queue video" });
  }
});

module.exports = router;
