const express = require("express");
const authorize = require("../middleware/authMiddleware");

const router = express.Router();

// Only Admins can create tasks
router.post("/create", authorize(["admin"]), (req, res) => {
    res.json({ message: "Task Created Successfully" });
});

// Both Admin and User can view tasks
router.get("/view", authorize(["admin", "user"]), (req, res) => {
    res.json({ message: "Tasks Retrieved" });
});

module.exports = router;
