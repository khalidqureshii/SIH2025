// src/components/ChatWidget.tsx
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatWindow from "./ChatWindow";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg z-50"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </>
  );
};

export default ChatWidget;
