import React, { useState, useRef, useEffect } from "react";
import OpenAI from "openai";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
//import ThemeToggle from './ThemeTogggle';
import { useTheme } from "./ThemeContext";

const Workspace = () => {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a funny LLM" },
    { role: "user", content: "Hello! My name is harish." },
    { role: "assistant", content: "Hello" },
    { text: "Welcome to the Workspace!", sender: "bot", time: "10:15 AM" },
    { text: "Hey there! How can I help you?", sender: "bot", time: "10:16 AM" },
  ]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const openai = new OpenAI({
    baseURL: "https://models.aixplain.com/api/v1/",
    apiKey: "bf62d8d009a231271e2294b430bae7570745699caaea49bb2cf44cdacb031dd3",
    dangerouslyAllowBrowser: true,
  });

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage = {
      role: "user",
      content: input,
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const completion = await openai.chat.completions.create({
        model: "669a63646eb56306647e1091",
        messages: updatedMessages.filter((m) => m.role),
      });

      const assistantMessage = {
        ...completion.choices[0].message,
        text: completion.choices[0].message.content,
        sender: "bot",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...updatedMessages, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          text: "Sorry, I encountered an error. Please try again.",
          sender: "bot",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File uploaded:", file);
      const newMessage = {
        text: `File uploaded: ${file.name}`,
        sender: "user",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className=" bg-gradient-to-br from-blue-100 via-stone-100 to-blue-200 ">
      <div className="backdrop-blur-md rounded-2xl shadow-xl ">
        <div
          className={`flex flex-col flex-1 h-screen transition-all  "bg-gray-900 text-black" }`}
        >
          <div className="flex-1 overflow-y-auto p-4" ref={chatContainerRef}>
            {messages.slice(3).map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user"
                    ? "items-end justify-end"
                    : "items-start justify-start"
                } mb-4`}
              >
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white shadow"
                  }`}
                  style={{ maxWidth: "70%" }}
                >
                  {message.text.startsWith("```") ? (
                    <div>
                      <SyntaxHighlighter language="javascript" style={dracula}>
                        {message.text.replace(
                          /```(javascript|python|terraform|bash)?/g,
                          ""
                        )}
                      </SyntaxHighlighter>
                      <button
                        onClick={() =>
                          handleCopyCode(
                            message.text.replace(
                              /```(javascript|python|terraform|bash)?/g,
                              ""
                            )
                          )
                        }
                        className="bg-green-500 text-white px-2 py-1 rounded mt-2 hover:bg-green-600 transition duration-300"
                      >
                        Copy Code
                      </button>
                    </div>
                  ) : (
                    <p>{message.text}</p>
                  )}
                  <span
                    className={`text-xs block ${
                      message.sender === "user"
                        ? "text-gray-300"
                        : "text-gray-500"
                    }`}
                  >
                    {message.time}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <p className="text-center text-gray-600">Loading...</p>
            )}
          </div>

          <div className="flex items-center border-t p-4 bg-white shadow-md">
            <input
              type="file"
              className="hidden"
              id="file-upload"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload" className="cursor-pointer px-3">
              <svg
                xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </label>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full ml-2 hover:bg-blue-700 transition duration-300">
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
