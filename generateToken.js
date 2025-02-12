const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (role) => {
    const token = jwt.sign({ role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log(`${role} Token: ${token}`);
};

generateToken("admin");
generateToken("user");
