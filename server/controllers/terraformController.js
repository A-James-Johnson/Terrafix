const TerraformFile = require("../models/TerraformFile.models")

exports.deploy = async (req, res) => {
  try {
    const { terraformCode } = req.body;

    // 1. Create configuration version
    const configResponse = await fetch(
      `https://app.terraform.io/api/v2/workspaces/${WORKSPACE_ID}/configuration-versions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TERRAFORM_TOKEN}`,
          "Content-Type": "application/vnd.api+json",
        },
        body: JSON.stringify({
          data: {
            type: "configuration-versions",
            attributes: {
              "auto-queue-runs": true,
            },
          },
        }),
      }
    );

    if (!configResponse.ok) {
      throw new Error(`Failed to create configuration version: ${configResponse.statusText}`);
    }

    const configData = await configResponse.json();
    const uploadUrl = configData.data.attributes["upload-url"];

    // 2. Upload Terraform code (simulate with plain buffer)
    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: Buffer.from(terraformCode, "utf-8"),
    });

    if (!uploadResponse.ok) {
      throw new Error(`Failed to upload Terraform code: ${uploadResponse.statusText}`);
    }

    res.json({ success: true, message: "Terraform code uploaded and run triggered!" });
  } catch (err) {
    console.error("Deploy error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};




exports.analyze = async (req, res) => {
  const { code } = req.body;
  console.log("Received terraform code for analysis:", code);

  try {
    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.TOGETHER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistralai/Mistral-7B-Instruct-v0.2", 
        messages: [
          {
            role: "system",
            content: "You are a Terraform code analysis assistant. Analyze and suggest improvements in JSON format.",
          },
          {
            role: "user",
            content: code,
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("Together.ai response:", data);

    if (!data || !data.choices) {
      return res.status(500).json({ message: "Failed to parse AI response" });
    }

    const aiContent = data.choices[0]?.message?.content;

    if (!aiContent) {
      return res.status(500).json({ message: "No analysis content found" });
    }

    try {
      return res.json(JSON.parse(aiContent));
    } catch (err) {
      console.error("Failed to parse AI content:", aiContent);
      return res.status(500).json({ message: "Invalid AI response format", raw: aiContent });
    }
  } catch (error) {
    console.error("Error during Together.ai API request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getFiles =async (req, res) => {
  try {
    const files = await TerraformFile.find();
    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ message: "Error fetching files" });
  }
};

exports.getFile =  async (req, res) => {
  try {
    const { name } = req.query;
    const file = await TerraformFile.findOne({ name });
    if (file) {
      res.status(200).json({ content: file.content });
    } else {
      res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching file" });
  }
};


exports.saveFile = async (req, res) => {
  try {
    const { name, content } = req.body;
    const file = new TerraformFile({ name, content });
    await file.save();
    res.status(201).json({ message: "File saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving file" });
  }
};




// exports.deleteFile =async (req,res) =>{
//     try{
//         const {name} =req.query;
//         const file=await TerraformFile.findOneAndDelete({
//             name
//         })
//     }
// }

