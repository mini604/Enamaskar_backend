const express = require("express");
const router = express.Router();
const queue = require("../server/queue");
const path = require("path");

router.get("/:jobId", async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await queue.getJob(jobId);

    if (!job) return res.status(404).json({ error: "Job not found" });

    const state = await job.getState();
    const progress = job._progress || 0;

    if (state === "completed") {
      const result = await job.finished();
      const fileName = path.basename(result.file); // result contains { file }
      return res.json({
        status: "completed",
        file: fileName,
        url: `${req.protocol}://${req.get("host")}/videos/${fileName}`,
      });
    }

    res.json({
      status: state,
      progress,
    });
  } catch (err) {
    console.error("Status route error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
