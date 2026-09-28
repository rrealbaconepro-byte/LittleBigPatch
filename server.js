const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve everything inside /public
app.use(express.static(path.join(__dirname, "public")));

// Automatically send users to index.html
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

// Newest Levels
app.get("/api/levels", (req, res) => {
  res.json({
    levels: []
  });
});

// If a page doesn't exist, load index.html instead of showing Not Found
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`LittleBigPatch is running on port ${PORT}`);
  console.log(`Serving: ${path.join(__dirname, "public", "index.html")}`);
});
