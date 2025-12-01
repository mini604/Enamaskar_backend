// worker/queue.js
const Queue = require("bull");
require("dotenv").config();

const videoQueue = new Queue("video-render-queue", {
  redis: {
    host: process.env.UPSTASH_REDIS_HOST,
    port: process.env.UPSTASH_REDIS_PORT,
    password: process.env.UPSTASH_REDIS_PASSWORD,
    tls: {}  // ⬅ required for Upstash
  }
});

module.exports = videoQueue;
