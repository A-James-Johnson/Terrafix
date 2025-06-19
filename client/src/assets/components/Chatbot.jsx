import { useState } from "react";
import axios from "axios";
import baseURL from "./baseURL";

function Chatbot() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    const sendMessage = async () => {
        try {
            const res = await axios.post(`${baseURL}/chat`, { message });
            setResponse(res.data.response);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h2>AI Chatbot</h2>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything..."
            />
            <button onClick={sendMessage}>Send</button>
            <p>Response: {response}</p>
        </div>
    );
}

export default Chatbot;