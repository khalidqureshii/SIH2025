import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader2, Send } from "lucide-react";
import { LINK2 } from "@/store/Link";
import ReactMarkdownType from "react-markdown";
import { useTranslation } from "react-i18next";

const ReactMarkdown = ReactMarkdownType as unknown as React.FC<{ children: string }>;

interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatSidebar = () => {
  const {t, i18n} = useTranslation();
  const lang = i18n.language || 'en';
  const [open, setOpen] = useState(false);
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
        body: JSON.stringify({ message: userMessage.text, language: lang}),
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg z-50">
          🌱
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex flex-col gap-0 h-full bg-white/95 backdrop-blur-md p-0 w-full max-w-[100%] sm:max-w-[80%] md:max-w-[60%] xl:max-w-[30%] "
      >

        <SheetHeader className="relative bg-green-600 text-white h-16 flex items-center justify-center px-4">
        <SheetTitle className="font-semibold text-3xl text-white mr-12">🌱 Bhoomiबंधु</SheetTitle>

        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-6 -translate-y-1/2 text-white text-3xl hover:text-gray-200"
        >
          ✖
        </button>
      </SheetHeader>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-green-200">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white"
                    : "bg-white border border-green-200 text-gray-800"
                } prose prose-sm`}
              >
                {msg.sender === "bot" ? <ReactMarkdown>{msg.text}</ReactMarkdown> : msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 text-green-600">
                <Loader2 className="animate-spin" size={20} />
                <span>{t("chat_sidebar.thinking")}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center border-t border-gray-300 bg-green-200 pt-3 px-0 md:p-4">
          <input
            type="text"
            placeholder="Ask BhoomiBandhu..."
            className="flex-1 px-3 py-2 focus:outline-none border rounded-none md:rounded-l-lg h-14"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-none md:rounded-r-lg h-14"
          >
            <Send size={24} />
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatSidebar;
