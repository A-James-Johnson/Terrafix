import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import baseURL from "./baseURL"

function FileViewer() {
  const { filename } = useParams();
  const navigate = useNavigate();
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    async function fetchFile() {
      try {
        const res = await fetch(`${baseURL}/get-file?name=${filename}`);
        const data = await res.json();
        setFileData(JSON.parse(data.content));
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    }

    fetchFile();
  }, [filename]);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Viewing: {filename}</h2>
      {fileData ? (
        <>
          <h3 className="font-semibold text-xl mb-2">Main Resources</h3>
          <pre className="bg-gray-800 text-white p-3 rounded mb-4">{fileData[0]}</pre>

          <h3 className="font-semibold text-xl mb-2">Variables</h3>
          <pre className="bg-gray-800 text-white p-3 rounded mb-4">{fileData[1]}</pre>

          <h3 className="font-semibold text-xl mb-2">Outputs</h3>
          <pre className="bg-gray-800 text-white p-3 rounded">{fileData[2]}</pre>
        </>
      ) : (
        <p>Loading file...</p>
      )}

      <button onClick={() => navigate(-1)} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
        ← Back to Home
      </button>
    </div>
  );
}

export default FileViewer;
