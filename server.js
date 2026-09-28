const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

// Basic middleware only
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: false, limit: "100kb" }));

// Serve files from this project
app.use(express.static(__dirname, {
  index: false
}));

// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Simple health check for Render
app.get("/api/status", (req, res) => {
  res.json({
    online: true,
    service: "LittleBigPatch"
  });
});

// Everything else
app.use((req, res) => {
  res.status(404).send("LittleBigPatch: Page not found");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`LittleBigPatch server running on port ${PORT}`);
});
