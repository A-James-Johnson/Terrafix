import { FileText, Shield, Sun, Moon, Plus, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const files = [
  { name: "main.tf", time: "3:17 PM" },
  { name: "variables.tf", time: "3:17 PM" },
  { name: "outputs.tf", time: "3:17 PM" },
  { name: "new_file.tf", time: "3:17 PM" },
];

function Home() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <div className={`${darkMode ? "bg-neutral-900 text-white" : "bg-neutral-100 text-black"} h-screen w-screen flex flex-col transition-all`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {/* Main Layout */}
      <div className="flex w-full h-full px-8 py-4 gap-12"> 
        <ProjectExplorer darkMode={darkMode} />
        <CollaborationPanel darkMode={darkMode} />
      </div>
    </div>
  );
}

export default Home;

const Header = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();

  return (
    <div className={`flex justify-between items-center p-4 border-b ${darkMode ? "bg-neutral-900 border-gray-700 text-white" : "bg-neutral-100 border-gray-300 text-black"}`}>
      <h1 className="text-xl font-semibold flex items-center gap-2">
        <Shield size={22} className="text-blue-400" />
        TerraFix
      </h1>

      {/* Right: Account, Help, New, Dark Mode */}
      <div className="flex items-center gap-4">
        <span className="cursor-pointer hover:underline">Account</span>
        <span className="cursor-pointer hover:underline">Help</span>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-700 transition transform hover:scale-105"
        >
          New
        </button>

        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
};

const DarkModeToggle = ({ darkMode, setDarkMode }) => (
  <button
    onClick={() => setDarkMode(!darkMode)}
    className="w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md bg-white/10 shadow-md transition-all hover:scale-110"
  >
    {darkMode ? <Sun size={22} className="text-yellow-400" /> : <Moon size={22} className="text-gray-800" />}
  </button>
);

const ProjectExplorer = ({ darkMode }) => (
  <div className="w-3/4">
    <h2 className="text-3xl font-bold mb-3">CODE-DEPLOY</h2>
    <h3 className={`text-base font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Project Explorer</h3>
    <ul className="mt-2 space-y-2">
      {files.map((file, index) => (
        <li
          key={index}
          className={`flex items-center justify-between p-3 rounded-md transition cursor-pointer ${
            darkMode ? "bg-neutral-800 hover:bg-neutral-700 text-white" : "bg-gray-200 hover:bg-gray-300 text-black"
          }`}
        >
          <div className="flex items-center gap-3">
            <FileText size={18} className={`${darkMode ? "text-gray-400" : "text-gray-600"}`} />
            <span className="truncate">{file.name}</span>
          </div>
          <span className="text-sm">{file.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

const CollaborationPanel = ({ darkMode }) => (
  <div className="w-1/4 flex flex-col gap-3">
    <h2 className="text-base font-semibold">Collaboration</h2>
    <button className="w-full bg-neutral-800 p-3 rounded-lg text-white flex items-center justify-center space-x-2 shadow-md hover:bg-neutral-700 transition">
      <Plus size={18} />
      <span>Share</span>
    </button>
    <button className="w-full bg-neutral-800 p-3 rounded-lg text-white flex items-center justify-center space-x-2 shadow-md hover:bg-neutral-700 transition">
      <MessageSquare size={18} />
      <span>Feedback</span>
    </button>
  </div>
);
