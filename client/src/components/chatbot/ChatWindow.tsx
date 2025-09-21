// src/components/ChatWindow.tsx
import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { LINK2 } from "@/store/Link";
import ReactMarkdownType from "react-markdown";

interface ChatWindowProps {
  onClose: () => void;
}

const ReactMarkdown = ReactMarkdownType as unknown as React.FC<{ children: string }>;

interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatWindow = ({ onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello I am Bhoomiबंधु, how can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${LINK2}/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();

      const botMessage: Message = {
        sender: "bot",
        text: data.reply || "Sorry, I couldn’t process that.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-white border-2 border-green-600 rounded-2xl shadow-xl flex flex-col z-50"
    >
      {/* Header */}
      <div className="flex justify-between items-center bg-green-600 text-white px-4 py-2 rounded-t-2xl">
        <h2 className="font-semibold">🌱 BhoomiBandhu</h2>
        <button onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-green-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-green-600 text-white"
                  : "bg-white border border-green-200 text-gray-800"
              }`}
            >
              {msg.sender === "bot" ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
            ) : (
                msg.text
            )}
            </div>
          </div>
        ))}

        {/* Loader */}
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 text-green-600">
              <Loader2 className="animate-spin" size={20} />
              <span>Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center border-t border-gray-300">
        <input
          type="text"
          placeholder="Ask BhoomiBandhu..."
          className="flex-1 px-3 py-2 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-2xl"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
