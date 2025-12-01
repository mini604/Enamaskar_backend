const express = require("express");
const cors = require("cors");
const path = require("path");

const renderRoute = require("./routes/renderRoute");
const statusRoute = require("./routes/statusRoute");

// Start worker
require("./server/worker");

const app = express();
app.use(cors());
app.use(express.json());

// Serve rendered videos from public/temp
app.use("/videos", express.static(path.join(__dirname, "public", "temp")));

// API routes
app.use("/api/render", renderRoute);
app.use("/api/status", statusRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
