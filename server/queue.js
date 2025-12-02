// worker/queue.js
const Queue = require("bull");
require("dotenv").config();

const videoQueue = new Queue("video-render-queue", {
  redis: {
    host: process.env.UPSTASH_REDIS_HOST,
    port: process.env.UPSTASH_REDIS_PORT ? parseInt(process.env.UPSTASH_REDIS_PORT, 10) : 6379,
    password: process.env.UPSTASH_REDIS_PASSWORD,
    tls: {}  // ⬅ required for Upstash
  }
});

// Add error handling for Redis connection
videoQueue.on("error", (error) => {
  console.error("Queue error:", error);
});

videoQueue.on("waiting", (jobId) => {
  console.log(`Job ${jobId} is waiting`);
});

videoQueue.on("active", (job) => {
  console.log(`Job ${job.id} is now active`);
});

videoQueue.on("completed", (job, result) => {
  console.log(`Job ${job.id} completed with result:`, result);
});

videoQueue.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});

module.exports = videoQueue;
