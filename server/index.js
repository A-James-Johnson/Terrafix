const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // 🔥 Add bcrypt for password hashing
const { Signup } = require("./schema.js");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
async function connectToDb() {
  try {
    await mongoose.connect(
      "mongodb+srv://James321485:James321485@cluster0.835jjax.mongodb.net/Terrafix?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("✅ DB connection established");
  } catch (error) {
    console.error("🔥 DB connection error:", error);
  }
}
connectToDb();

// Signup endpoint
app.post("/signup", async (req, res) => {
  try {
    const { email, password, user } = req.body;

    // Check if user already exists
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔥 Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save a new user
    const newUser = new Signup({ email, password: hashedPassword, user });
    await newUser.save();

    console.log("✅ Signup successful:", newUser);
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("🔥 Signup failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`🔍 Login Attempt: username=${username}`);

    // Find the user in the database
    const user = await Signup.findOne({ user: username });

    if (!user) {
      console.log("❌ User not found");
      return res
        .status(401)
        .json({ message: "Username or password is incorrect" });
    }

    // Compare entered password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ Incorrect password");
      return res
        .status(401)
        .json({ message: "Username or password is incorrect" });
    }

    console.log("✅ Login successful");
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("🔥 Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Server
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}...`);
});
