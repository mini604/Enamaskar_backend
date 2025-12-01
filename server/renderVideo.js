const path = require("path");
const fs = require("fs");
const { renderMedia, selectComposition } = require("@remotion/renderer");
const { bundle } = require("@remotion/bundler");

module.exports = async function renderVideo(data, job) {
  const remotionEntry = path.join(__dirname, "..", "remotion", "index.jsx");

  if (!fs.existsSync(remotionEntry)) {
    throw new Error("Remotion entry file not found: " + remotionEntry);
  }

  console.log("Bundling project...");
  const bundleLocation = await bundle(remotionEntry);

  console.log("Selecting composition...");
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "MainComp", // must match your Remotion composition id
    inputProps: data,
  });

  const outputFolder = path.join(__dirname, "..", "public", "temp");
  if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder, { recursive: true });

  const outputPath = path.join(outputFolder, `output_${Date.now()}.mp4`);

  console.log("Rendering video...");
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: outputPath,
    inputProps: data,
    onProgress: (p) => {
      if (job) job.progress(Math.floor(p * 100));
    },
  });

  console.log("Render complete:", outputPath);
  return outputPath;
};
