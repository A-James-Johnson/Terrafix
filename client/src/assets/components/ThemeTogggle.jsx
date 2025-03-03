import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function ThemeToggle() {
  const { darkMode, setDarkMode } = useTheme(); // Access global theme state

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg 
                 bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-800 
                 dark:text-white dark:hover:bg-gray-700 transition"
    >
      {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-700" />}
    </button>
  );
}
