const express = require("express");
const { verifyToken, restrictTo } = require("./middleware.js");

require("dotenv").config();
const app = express();

app.use(express.json()); // Middleware to parse JSON

// 🔹 Public Route (No token required)
app.get("/", (req, res) => {
    res.send("Welcome to the Task Management System API!");
});

// 🔹 Protected Route (Requires token)
app.get("/dashboard", verifyToken, (req, res) => {
    res.json({ message: "Welcome to the dashboard!", user: req.user });
});

// 🔹 Admin-Only Route
app.get("/admin", verifyToken, restrictTo("admin"), (req, res) => {
    res.json({ message: "Welcome, Admin! You have special access." });
});

// 🔹 User-Only Route
app.get("/user", verifyToken, restrictTo("user"), (req, res) => {
    res.json({ message: "Hello, User! This is your dashboard." });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
