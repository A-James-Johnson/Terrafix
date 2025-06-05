const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const terraformFileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Signup = mongoose.model("Signup", signupSchema);
const TerraformFile = mongoose.model("TerraformFile", terraformFileSchema);

module.exports = { Signup, TerraformFile };
