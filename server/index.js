require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Signup, TerraformFile } = require("./schema.js");
const fetch = require("node-fetch");
const OpenAI = require("openai");
const os = require('os');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const jwt = require("jsonwebtoken");



// const authRoutes = require("./routes/authRoutes");






const app = express();
app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: "https://terrafix.vercel.app",
  credentials: true
}));
async function connectToDb() {
  try {
    await mongoose.connect("mongodb+srv://James321485:James321485@cluster0.835jjax.mongodb.net/Review?retryWrites=true&w=majority&appName=Cluster0");
    console.log("✅ DB connection established");
  } catch (error) {
    console.error("🔥 DB connection error:", error);
  }
}
connectToDb();
const terraformRoutes =require("./routes/terraformRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/", authRoutes); // ✅ Now this works perfectly
app.use("/", terraformRoutes);

const path = require('path');
const express = require('express');
const app = express();

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});



const TERRAFORM_TOKEN = process.env.TERRAFORM_API_TOKEN;
const WORKSPACE_ID = process.env.WORKSPACE_ID;




// app.post("/signup", async (req, res) => {
//   const { user: username, email, password } = req.body;

//   try {
//     const existingUser = await Signup.findOne({ email });
//     if (existingUser) {
//       return res.status(400).send({ message: "Email already exists" });
//     }

//     const hashedPassword = bcrypt.hashSync(password, 10);
//     const newUser = new Signup({ username, email, password: hashedPassword });

//     const savedUser = await newUser.save();
//     const token = jwt.sign({ id: savedUser._id }, "secretKey");

//     return res.status(200).send({
//       user: {
//         username: savedUser.username,
//         email: savedUser.email,
//       },
//       accessToken: token,
//       message: "Signed up successfully",
//     });
//   } catch (err) {
//     console.error("Signup error:", err);
//     return res.status(500).send({ message: "Error signing up" });
//   }
// });



// app.post("/deploy", async (req, res) => {
//   try {
//     const { terraformCode } = req.body;

//     // 1. Create configuration version
//     const configResponse = await fetch(
//       `https://app.terraform.io/api/v2/workspaces/${WORKSPACE_ID}/configuration-versions`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${TERRAFORM_TOKEN}`,
//           "Content-Type": "application/vnd.api+json",
//         },
//         body: JSON.stringify({
//           data: {
//             type: "configuration-versions",
//             attributes: {
//               "auto-queue-runs": true,
//             },
//           },
//         }),
//       }
//     );

//     if (!configResponse.ok) {
//       throw new Error(`Failed to create configuration version: ${configResponse.statusText}`);
//     }

//     const configData = await configResponse.json();
//     const uploadUrl = configData.data.attributes["upload-url"];

//     // 2. Upload Terraform code (simulate with plain buffer)
//     const uploadResponse = await fetch(uploadUrl, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/octet-stream",
//       },
//       body: Buffer.from(terraformCode, "utf-8"),
//     });

//     if (!uploadResponse.ok) {
//       throw new Error(`Failed to upload Terraform code: ${uploadResponse.statusText}`);
//     }

//     res.json({ success: true, message: "Terraform code uploaded and run triggered!" });
//   } catch (err) {
//     console.error("Deploy error:", err.message);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });



// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await Signup.findOne({ email });

//     if (!user) {
//       return res.status(400).send({ message: "User not found" });
//     }

//     const isPasswordValid = bcrypt.compareSync(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).send({ message: "Incorrect password" });
//     }

//     const token = jwt.sign({ id: user._id }, "secretKey");

//     return res.status(200).send({
//       user: {
//         id: user._id,
//         email: user.email,
//         username: user.username,
//       },
//       accessToken: token,
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).send({ message: "Server error" });
//   }
// });


// app.get("/get-files", async (req, res) => {
//   try {
//     const files = await TerraformFile.find();
//     res.status(200).json({ files });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching files" });
//   }
// });

// app.get("/get-file", async (req, res) => {
//   try {
//     const { name } = req.query;
//     const file = await TerraformFile.findOne({ name });
//     if (file) {
//       res.status(200).json({ content: file.content });
//     } else {
//       res.status(404).json({ message: "File not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching file" });
//   }
// });



// app.post("/save-file", async (req, res) => {
//   try {
//     const { name, content } = req.body;
//     const file = new TerraformFile({ name, content });
//     await file.save();
//     res.status(201).json({ message: "File saved successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error saving file" });
//   }
// });

// app.post("/analyze", async (req, res) => {
//   const { code } = req.body;
//   console.log("Received terraform code for analysis:", code);

//   try {
//     const response = await fetch("https://api.together.xyz/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.TOGETHER_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "mistralai/Mistral-7B-Instruct-v0.2", 
//         messages: [
//           {
//             role: "system",
//             content: "You are a Terraform code analysis assistant. Analyze and suggest improvements in JSON format.",
//           },
//           {
//             role: "user",
//             content: code,
//           },
//         ],
//       }),
//     });

//     const data = await response.json();
//     console.log("Together.ai response:", data);

//     if (!data || !data.choices) {
//       return res.status(500).json({ message: "Failed to parse AI response" });
//     }

//     const aiContent = data.choices[0]?.message?.content;

//     if (!aiContent) {
//       return res.status(500).json({ message: "No analysis content found" });
//     }

//     try {
//       return res.json(JSON.parse(aiContent));
//     } catch (err) {
//       console.error("Failed to parse AI content:", aiContent);
//       return res.status(500).json({ message: "Invalid AI response format", raw: aiContent });
//     }
//   } catch (error) {
//     console.error("Error during Together.ai API request:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

app.listen(9000, () => {
  console.log("✅ Server is running on port 9000");
});
