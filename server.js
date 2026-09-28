const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve files from the repository root
app.use(express.static(__dirname));

// Always load index.html for the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
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

// Newest Levels
app.get("/api/levels", (req, res) => {
  res.json({
    levels: []
  });
});

// Send index.html instead of Not Found
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`LittleBigPatch is running on port ${PORT}`);
  console.log(`Serving: ${path.join(__dirname, "index.html")}`);
});
