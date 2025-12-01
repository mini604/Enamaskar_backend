const queue = require("./queue");
const renderVideo = require("./renderVideo");

console.log("Worker started...");

queue.process(async (job) => {
  console.log("Rendering job:", job.id);
  try {
    const file = await renderVideo(job.data, job);
    return { file }; // return object with `file` for statusRoute
  } catch (err) {
    console.error("Render job failed:", err);
    throw err;
  }
});
