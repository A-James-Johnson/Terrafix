import { useTheme } from "./ThemeContext";
import ThemeToggle from "./ThemeTogggle";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import Editor from "@monaco-editor/react";
import { useState } from "react";


export default function Dashboard() {
  const { darkMode } = useTheme();
  const [code, setCode] = useState("// Write Terraform code here !! ");
  const editorTheme = darkMode ? "vs-dark" : "light";

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} transition-all`}>
      <ThemeToggle />

      <div className="flex">
        <aside className="w-64 p-4 bg-gray-300 dark:bg-gray-800 border-r border-gray-500 dark:border-gray-700">
          <h2 className="text-xl font-bold">Main.tf</h2>
          <nav className="mt-4 space-y-2">
            {["Overview", "Code", "AI-chat"].map((item) => (
              <button key={item} className="w-full text-left p-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700">
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold">main.tf</h1>
          <div className="mt-4 h-60 bg-gray-300 dark:bg-gray-800 rounded-lg overflow-hidden">
            <Editor height="100%" defaultLanguage="terraform" value={code} onChange={(value) => setCode(value)} theme={editorTheme} />
          </div>

          <h2 className="mt-6 text-xl font-semibold">AI Analysis</h2>
          <div className="mt-4 p-4 bg-gray-300 dark:bg-gray-800 border border-gray-500 dark:border-gray-700 rounded-lg flex items-start gap-2">
            <AlertCircle className="text-red-500" />
            <div>
              <h3 className="font-medium">Resource not found</h3>
              <p className="text-sm text-gray-500">The 'aws_instance' resource refers to an AMI that does not exist.</p>
            </div>
           
          </div>
          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition transform hover:scale-105">
              Analyse Code
            </button>
            <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition transform hover:scale-105">
              Deploy
            </button>
            <button className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition transform hover:scale-105">
              Save
            </button>
          </div>
        </main>
        
      </div>
    </div>
  );
}
