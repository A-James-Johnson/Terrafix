import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Sun, Moon, Plus, MessageSquare, FileText } from "lucide-react";

function Home() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [files, setFiles] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    fetchFiles();
  }, [darkMode]);

  const fetchFiles = async () => {
    const res = await fetch("http://localhost:9000/get-files");
    const data = await res.json();
    setFiles(data.files);
  };

  const handleFileClick = async (filename) => {
    setSelectedFileName(filename);
    const res = await fetch(`http://localhost:9000/get-file?name=${filename}`);
    const data = await res.json();
    setSelectedContent(JSON.parse(data.content));
  };

  const saveFile = async (filename, content) => {
    try {
      const res = await fetch("http://localhost:9000/save-file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: filename, content: JSON.stringify(content) }),
      });

      const data = await res.json();
      if (res.ok) {
        fetchFiles();
        alert("File saved successfully!");
      } else {
        alert("Error saving file");
      }
    } catch (error) {
      alert("An error occurred while saving the file.");
    }
  };

  return (
    <div className={`${darkMode ? "bg-neutral-900 text-white" : "bg-neutral-100 text-black"} h-screen w-screen flex flex-col transition-all`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex w-full h-full px-8 py-4 gap-12">
        <div className="w-3/4">
          <h2 className="text-3xl font-bold mb-3">CODE-DEPLOY</h2>
          <h3 className={`text-base font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Project Explorer</h3>
          <ul className="mt-2 space-y-2">
            {files.map((file) => (
              <li
                key={file._id}
                onClick={() => handleFileClick(file.name)}
                className={`flex justify-between p-3 rounded-md cursor-pointer ${
                  darkMode ? "bg-neutral-800 hover:bg-neutral-700 text-white" : "bg-gray-200 hover:bg-gray-300 text-black"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText size={18} />
                  <span>{file.name}</span>
                </div>
                <span className="text-sm">{new Date(file.createdAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>

          {selectedContent && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-xl">Main Resources</h3>
              <pre className="bg-gray-400 text-white p-3 rounded">{selectedContent[0]}</pre>
              <h3 className="font-semibold text-xl">Variables</h3>
              <pre className="bg-gray-400 text-white p-3 rounded">{selectedContent[1]}</pre>
              <h3 className="font-semibold text-xl">Outputs</h3>
              <pre className="bg-gray-400 text-white p-3 rounded">{selectedContent[2]}</pre>

            </div>
          )}
        </div>
        <CollaborationPanel darkMode={darkMode} />
      </div>
    </div>
  );
}

const Header = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  return (
    <div className={`flex justify-between items-center p-4 border-b ${darkMode ? "bg-neutral-900 border-gray-700 text-white" : "bg-neutral-100 border-gray-300 text-black"}`}>
      <h1 className="text-xl font-semibold flex items-center gap-2">
        <Shield size={22} className="text-blue-400" /> TerraFix
      </h1>
      <div className="flex items-center gap-4">
        <span className="cursor-pointer hover:underline">Account</span>
        <span className="cursor-pointer hover:underline">Help</span>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
        >
          New
        </button>
        <button onClick={() => setDarkMode(!darkMode)} className="w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md bg-white/10 shadow-md">
          {darkMode ? <Sun size={22} className="text-yellow-400" /> : <Moon size={22} className="text-gray-800" />}
        </button>
      </div>
    </div>
  );
};

const CollaborationPanel = ({ darkMode }) => (
  <div className="w-1/4 flex flex-col gap-3">
    <h2 className="text-base font-semibold">Collaboration</h2>
    <button className="w-full bg-neutral-700 p-3 rounded-lg text-white hover:bg-neutral-700">
      <Plus size={18} /> Share
    </button>
    <button className="w-full bg-neutral-700 p-3 rounded-lg text-white hover:bg-neutral-700">
      <MessageSquare size={18} /> Feedback
    </button>
  </div>
);

export default Home;
