import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import Editor from "@monaco-editor/react";
import { useTerraform } from "./TerraformContext";
import { TerraformContext } from "./TerraformContext";
import baseURL from "./baseURL"

const Dashboard = () => {
  const [code, setCode] = useState(() => {
    return localStorage.getItem("terraformCode") || "// Write Terraform code here !! ";
  });
  const { saveSplitFiles } = useTerraform();
  const [loading, setLoading] = useState(true);
  const { terraformCode, setTerraformCode } = useContext(TerraformContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [planOutput, setPlanOutput] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const response = await fetch(
        "https://models.aixplain.com/api/v1/execute/674a17f6098e7d5b18453da8",
        {
          method: "POST",
          headers: {
            "x-api-key": "d122264ababbc56372f57bc36e821bd962035aaa4fe62addf2d2aa8660ec0813",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: code }),
        }
      );

      const responseData = await response.json();
      const dataUrl = responseData.data;

      let resultData;
      for (let i = 0; i < 35; i++) {
        const result = await fetch(dataUrl, {
          headers: {
            "x-api-key": "d122264ababbc56372f57bc36e821bd962035aaa4fe62addf2d2aa8660ec0813",
          },
        });

        const resultJson = await result.json();
        if (resultJson.completed) {
          resultData = resultJson;
          break;
        }

        await new Promise((res) => setTimeout(res, 2000));
      }

      if (!resultData || !resultData.completed) {
        alert("AI Analysis timed out. Please try again.");
        setAnalyzing(false);
        return;
      }

      sessionStorage.setItem("analysisResult", JSON.stringify(resultData));
      localStorage.setItem("terraformcode", code);

      navigate("/Analysis", {
        state: {
          analysisResult: resultData,
          terraformCode: code,
        },
      });
    } catch (err) {
      console.error("AI Analysis failed:", err);
      alert("An error occurred during analysis.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDeploy = async () => {
    setLoading(true);
    setTimeout(() => {
      const simulatedPlanOutput = simulateTerraformPlan(code);
      setPlanOutput(simulatedPlanOutput);
      setModalOpen(true);
      setLoading(false);
    }, 2000);
  };

  const simulateTerraformPlan = (code) => {
    let planOutput = "";
    if (code.includes("aws_instance")) {
      planOutput = `Terraform will perform the following actions:

  # aws_instance.example will be created
  + resource "aws_instance" "example" {
      + ami           = "ami-0c55b159cbfafe1f0"
      + instance_type = "t2.micro"
      + id            = (known after apply)
      + tags          = {
          + "Name" = "example-instance"
        }
    }

Plan: 1 to add, 0 to change, 0 to destroy.`;
    } else if (code.includes("aws_s3_bucket")) {
      planOutput = `Terraform will perform the following actions:

  # aws_s3_bucket.example will be updated
  ~ resource "aws_s3_bucket" "example" {
      + versioning = "Enabled"
  }

Plan: 0 to add, 1 to change, 0 to destroy.`;
    } else if (code.includes("aws_lambda_function")) {
      planOutput = `Terraform will perform the following actions:

  # aws_lambda_function.example will be destroyed
  - resource "aws_lambda_function" "example" {
      - arn           = "arn:aws:lambda:us-east-1:123456789012:function:example-function" -> null
      - function_name = "example-function" -> null
      - handler       = "index.handler" -> null
      - runtime       = "nodejs14.x" -> null
      - timeout       = 3 -> null
  }

Plan: 0 to add, 0 to change, 1 to destroy.`;
    } else {
      planOutput = `No changes detected. The configuration matches the current state.`;
    }
    return planOutput;
  };

  const handleSave = async () => {
    const mainMatches = code.match(/resource\s+".+?"\s+".+?"\s+{[^}]*}/gs)?.join("\n") || "";
    const variableMatches = code.match(/variable\s+".+?"\s+{[^}]*}/gs)?.join("\n") || "";
    const outputMatches = code.match(/output\s+".+?"\s+{[^}]*}/gs)?.join("\n") || "";

    const fullContent = JSON.stringify([
      mainMatches,
      variableMatches,
      outputMatches,
    ]);

    const filename = prompt("Enter filename:");
    if (filename) {
      const res = await fetch(`${baseURL}/save-file`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: filename, content: fullContent }),
      });
      saveSplitFiles(mainMatches, variableMatches, outputMatches);
      alert("Terraform code split and saved!");
      navigate("/overview");
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <div className="text-white p-10">Loading...</div>;

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-blue-100 via-stone-100 to-blue-200 text-black">
  //     <div className="flex">
  //       <aside className="w-64 min-h-screen p-6 bg-gray-600 border-r border-gray-600 shadow-lg text-white">
  //         <h2
  //           className="text-2xl font-bold mb-6 px-4 py-2 border border-white shadow-lg w-full rounded-lg inline-block cursor-pointer"
  //           onClick={() => navigate("/home")}
  //         >
  //           Terrafix
  //         </h2>
  //         <nav className="space-y-3">
  //           {["Overview", "Code", "AI-chat"].map((item) => (
  //             <button
  //               key={item}
  //               className="w-full px-4 py-2 text-left text-md font-bold rounded-md hover:bg-gray-600 transition"
  //               onClick={() => {
  //                 if (item === "AI-chat") navigate("/workspace");
  //                 else if (item === "Overview") navigate("/overview");
  //               }}
  //             >
  //               {item}
  //             </button>
  //           ))}
  //         </nav>
  //       </aside>

  //       <main className="flex-1 p-8">
  //         <h1 className="text-3xl font-bold mb-4">Terraform Code Editor</h1>
  //         <div className="h-60 rounded-lg overflow-hidden border border-gray-600">
  //           <Editor
  //             height="100%"
  //             defaultLanguage="terraform"
  //             value={code}
  //             onChange={(value) => {
  //               setCode(value);
  //               localStorage.setItem("terraformCode", value || "");
  //             }}
  //             theme="vs-dark"
  //           />
  //         </div>

  //         <div className="mt-6 space-y-4">
  //           <div className="flex items-start bg-yellow-600 bg-opacity-20 p-4 rounded-md border border-yellow-700">
  //             <AlertCircle className="text-yellow-400 mt-1 mr-3" />
  //             <div>
  //               <h3 className="font-semibold">Resource not found</h3>
  //               <p className="text-sm text-gray-700">
  //                 The 'aws_instance' resource refers to an AMI that does not exist.
  //               </p>
  //             </div>
  //           </div>
  //           <div className="flex gap-4">
  //             <button
  //               className="px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
  //               onClick={handleAnalyze}
  //               disabled={analyzing}
  //             >
  //               {analyzing && <Loader2 className="animate-spin w-5 h-5" />}
  //               {analyzing ? "Analyzing..." : "Analyze Code"}
  //             </button>
  //             <button
  //               className="px-6 py-3 bg-green-600 rounded-lg font-semibold hover:bg-green-700"
  //               onClick={handleDeploy}
  //             >
  //               Deploy
  //             </button>
  //             <button
  //               className="px-6 py-3 bg-gray-600 rounded-lg font-semibold hover:bg-gray-700 text-white"
  //               onClick={handleSave}
  //             >
  //               Save
  //             </button>
  //           </div>
  //         </div>

  //         {modalOpen && (
  //           <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
  //             <div className="bg-white text-black rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 shadow-xl overflow-y-auto max-h-[80vh]">
  //               <h2 className="text-xl font-bold mb-4">Terraform Plan Output</h2>
  //               <pre className="whitespace-pre-wrap text-sm">{planOutput}</pre>
  //               <button
  //                 onClick={() => setModalOpen(false)}
  //                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  //               >
  //                 Close
  //               </button>
  //             </div>
  //           </div>
  //         )}
  //       </main>
  //     </div>
  //   </div>
  // );
return(
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-stone-100 to-blue-200 text-black">
  <div className="flex flex-col md:flex-row">
    {/* Sidebar */}
    <aside className="w-full md:w-64 p-4 md:p-6 bg-gray-800 text-white shadow-md">
      <h2
        className="text-xl md:text-2xl font-bold mb-4 md:mb-6 px-4 py-2 border border-white shadow-lg rounded-lg cursor-pointer"
        onClick={() => navigate("/home")}
      >
        Terrafix
      </h2>
      <nav className="space-y-2">
        {["Overview", "Code", "AI-chat"].map((item) => (
          <button
            key={item}
            className="w-full px-4 py-2 text-left text-sm md:text-base font-semibold rounded-md hover:bg-gray-700 transition"
            onClick={() => {
              if (item === "AI-chat") navigate("/workspace");
              else if (item === "Overview") navigate("/overview");
            }}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Terraform Code Editor</h1>

      {/* Editor */}
      <div className="h-64 md:h-80 rounded-lg overflow-hidden border border-gray-600">
        <Editor
          height="100%"
          defaultLanguage="terraform"
          value={code}
          onChange={(value) => {
            setCode(value);
            localStorage.setItem("terraformCode", value || "");
          }}
          theme="vs-dark"
        />
      </div>

      {/* Alert */}
      <div className="mt-6 bg-yellow-600 bg-opacity-20 p-4 rounded-md border border-yellow-700 flex flex-col sm:flex-row items-start">
        <AlertCircle className="text-yellow-400 mt-1 mr-0 sm:mr-3" />
        <div>
          <h3 className="font-semibold">Resource not found</h3>
          <p className="text-sm text-gray-700">
            The 'aws_instance' resource refers to an AMI that does not exist.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <button
          className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
          onClick={handleAnalyze}
          disabled={analyzing}
        >
          {analyzing && <Loader2 className="animate-spin w-5 h-5" />}
          {analyzing ? "Analyzing..." : "Analyze Code"}
        </button>

        <button
          className="px-5 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
          onClick={handleDeploy}
        >
          Deploy
        </button>

        <button
          className="px-5 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800"
          onClick={handleSave}
        >
          Save
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-4 md:p-6 w-[90%] sm:w-4/5 lg:w-1/2 shadow-xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg md:text-xl font-bold mb-4">Terraform Plan Output</h2>
            <pre className="whitespace-pre-wrap text-sm">{planOutput}</pre>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  </div>
</div>

)
};

export default Dashboard;
