const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Signup=require("../models/usermodels");



exports.signup =async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new Signup({ username, email, password: hashedPassword });

    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

    return res.status(200).send({
      user: {
        username: savedUser.username,
        email: savedUser.email,
      },
      accessToken: token,
      message: "Signed up successfully",
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).send({ message: "Error signing up" });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Signup.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.status(200).send({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      accessToken: token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send({ message: "Server error" });
  }
};


