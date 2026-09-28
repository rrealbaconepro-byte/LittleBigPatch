const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the website
app.use(express.static(path.join(__dirname, "public")));

// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Server status
app.get("/api/status", (req, res) => {
  res.json({
    online: true,
    name: "LittleBigPatch",
    status: "online",
    time: new Date().toISOString()
  });
});

// Newest Levels API
app.get("/api/levels", (req, res) => {
  res.json({
    levels: []
  });
});

// Express 5-compatible fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`LittleBigPatch running on port ${PORT}`);
});
