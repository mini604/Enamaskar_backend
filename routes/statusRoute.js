const express = require("express");
const router = express.Router();
const queue = require("../server/queue");
const path = require("path");

router.get("/:jobId", async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await queue.getJob(jobId);
    console.log("Fetching status for job:", job);
    if (!job) return res.status(404).json({ error: "Job not found" });

    const state = await job.getState();
    console.log("Job state:", state);
    const progress = job.progress || 0;

    if (state === "completed") {
      const result = job.returnvalue; // Bull v4 uses returnvalue property
      console.log("Job result:", result);
      if (!result || !result.file) {
        return res.status(500).json({ error: "Job completed but no file returned" });
      }
      const fileName = path.basename(result.file); // result contains { file }
      return res.json({
        status: "completed",
        file: fileName,
        url: `${req.protocol}://${req.get("host")}/videos/${fileName}`,
      });
    }

    if (state === "failed") {
      const failedReason = job.failedReason || "Unknown error";
      return res.json({
        status: "failed",
        error: failedReason,
        progress: 0,
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
