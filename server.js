const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve everything inside /public
app.use(express.static(path.join(__dirname, "public")));

// Main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Basic server status API
app.get("/api/status", (req, res) => {
  res.json({
    online: true,
    name: "LittleBigPatch",
    status: "online",
    time: new Date().toISOString()
  });
});

// Example API for newest levels
app.get("/api/levels", (req, res) => {
  res.json({
    levels: []
  });
});

// Fallback to the main site
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`LittleBigPatch running on port ${PORT}`);
});
