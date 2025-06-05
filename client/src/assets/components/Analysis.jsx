import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Analysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    const { analysisResult, terraformCode } = location.state || {};
    if (!analysisResult || !terraformCode) {
      alert("No analysis data received. Please analyze code first.");
      navigate("/");
      return;
    }
    setResult(analysisResult);
    setCode(terraformCode);
  }, [location.state, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-stone-100 to-blue-200 text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            ~~ AI Analysis Result ~~
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-sm font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-indigo-600 transition duration-300 ease-in-out transform hover:scale-105 mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </button>
        </div>

        <div className="bg-gray-800 border border-gray-700 shadow-lg rounded-xl p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">
            Terraform Code
          </h2>
          <pre className="bg-gray-900 text-green-300 text-sm p-4 rounded-lg overflow-auto whitespace-pre-wrap leading-relaxed">
            {code}
          </pre>
        </div>

        <div className="bg-gray-800 border border-gray-700 shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">
            AI Output
          </h2>
          <pre className="bg-gray-900 text-blue-300 text-sm p-4 rounded-lg overflow-auto whitespace-pre-wrap leading-relaxed">
            {result?.data || "No output found."}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
