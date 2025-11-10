const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const SECRET_KEY = "secret"; // store in .env in real apps

// Hardcoded credentials
const USER = { username: "admin", password: "admin@123" };

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ message: "Login successful", token });
  }
  return res.status(401).json({ message: "Invalid username or password" });
});

// Protected route
app.get("/api/secure", verifyToken, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.username}! This is a protected API.`,
    time: new Date().toISOString(),
  });
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader)
    return res.status(403).json({ message: "Token not provided" });

  const token = bearerHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
}

app.listen(4000, () =>
  console.log("✅ Server running at http://localhost:4000")
);
