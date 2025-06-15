const mongoose = require("mongoose");

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

// ✅ Prevent model overwrite during hot reloads (Nodemon)
const TerraformFile = mongoose.models.TerraformFile || mongoose.model("TerraformFile", terraformFileSchema);

module.exports = TerraformFile;
