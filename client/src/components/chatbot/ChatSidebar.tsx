// import { useEffect, useState } from "react";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Loader2, Send } from "lucide-react";
// import { LINK2 } from "@/store/Link";
// import ReactMarkdownType from "react-markdown";
// import { useTranslation } from "react-i18next";
// import { useLocation } from "react-router-dom";
// import VoiceInput from "./VoiceInput";

// const ReactMarkdown = ReactMarkdownType as unknown as React.FC<{
//   children: string;
// }>;

// interface Message {
//   sender: "user" | "bot";
//   text: string;
// }

// const useVoices = () => {
//   const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

//   useEffect(() => {
//     const loadVoices = () => {
//       const voicesList = window.speechSynthesis.getVoices();
//       setVoices(voicesList);
//       console.log("Available voices:");
//       voicesList.forEach((v, i) =>
//         console.log(`${i + 1}. ${v.name} — ${v.lang}`)
//       );
//     };

//     loadVoices();
//     window.speechSynthesis.onvoiceschanged = loadVoices;
//   }, []);

//   return voices;
// };

// const ChatSidebar = () => {
//   const { t, i18n } = useTranslation();
//   const lang = i18n.language || "en";
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([
//     { sender: "bot", text: "Hello I am बंधु, how can I help you?" },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { pathname } = useLocation();
//   const voices = useVoices();

//   const speakText = (text: string, lang = "en-IN") => {
//     console.log("here");
//     if ("speechSynthesis" in window) {
//       const utterance = new SpeechSynthesisUtterance(text);
//       const selectedVoice = voices.find((v) => v.lang === lang);
//       if (selectedVoice) {
//         utterance.voice = selectedVoice;
//       }
//       utterance.lang = lang;
//       utterance.rate = 1;
//       utterance.pitch = 1;
//       speechSynthesis.speak(utterance);
//     } else {
//       alert("Sorry, your browser does not support text-to-speech.");
//     }
//   };

//   const sendMessage = async (inp: string) => {
//     // if (!input.trim()) return;

//     const userMessage: Message = { sender: "user", text: inp };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await fetch(`${LINK2}/chatbot`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userMessage.text, language: lang }),
//       });

//       const data = await response.json();

//       const botMessage: Message = {
//         sender: "bot",
//         text: data.reply || "Sorry, I couldn’t process that.",
//       };

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "⚠️ Error connecting to server." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (pathname === "/auth") return null;

//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       <SheetTrigger asChild>
//         <button className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg z-50">
//           🌱
//         </button>
//       </SheetTrigger>

//       <SheetContent
//         side="right"
//         className="flex flex-col gap-0 h-full bg-white/95 backdrop-blur-md p-0 w-full max-w-[100%] sm:max-w-[80%] md:max-w-[60%] xl:max-w-[30%] "
//       >
//         <SheetHeader className="relative bg-green-600 text-white h-16 flex items-center justify-center px-4">
//           <SheetTitle className="font-semibold text-3xl text-white mr-12">
//             🌱 Bhoomiबंधु
//           </SheetTitle>

//           <button
//             onClick={() => setOpen(false)}
//             className="absolute right-4 top-6 -translate-y-1/2 text-white text-3xl hover:text-gray-200"
//           >
//             ✖
//           </button>
//         </SheetHeader>

//         {/* Messages */}
//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-green-200">
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`flex ${
//                 msg.sender === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-xl max-w-[80%] relative ${
//                   msg.sender === "user"
//                     ? "bg-green-600 text-white"
//                     : "bg-white border border-green-200 text-gray-800"
//                 } prose prose-sm`}
//               >
//                 {msg.sender === "bot" ? (
//                   <div className="flex flex-col gap-1">
//                     <ReactMarkdown>{msg.text}</ReactMarkdown>
//                     {/* Listen button only for bot messages */}
//                     <button
//                       onClick={() => speakText(msg.text, lang)}
//                       className="mt-1 text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
//                     >
//                       🔊
//                     </button>
//                   </div>
//                 ) : (
//                   msg.text
//                 )}
//               </div>
//             </div>
//           ))}

//           {loading && (
//             <div className="flex justify-start">
//               <div className="flex items-center gap-2 text-green-600">
//                 <Loader2 className="animate-spin" size={20} />
//                 <span>{t("chat_sidebar.thinking")}</span>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex items-center border-t border-gray-300 bg-green-200 pt-3 px-0 md:p-4">
//           <VoiceInput
//             onTranscribe={(text) => {
//               setInput(text);
//               sendMessage(text);
//             }}
//           />
//           <input
//             type="text"
//             placeholder="Ask BhoomiBandhu..."
//             className="flex-1 px-3 py-2 focus:outline-none border h-12 text-sm sm:text-base"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) =>
//               e.key === "Enter" && sendMessage(e.currentTarget.value)
//             }
//           />
//           <button
//             onClick={() => {
//               sendMessage(input);
//             }}
//             className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center w-12 sm:w-16 h-12 rounded-none md:rounded-r-lg"
//           >
//             <Send size={20} className="sm:w-6 sm:h-6" />
//           </button>
//         </div>

//         {/* <div className="flex items-center border-t border-gray-300 bg-green-200 pt-3 px-0 md:p-4">
//           <input
//             type="text"
//             placeholder="Ask BhoomiBandhu..."
//             className="flex-1 px-3 py-2 focus:outline-none border rounded-none md:rounded-l-lg h-14"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-none md:rounded-r-lg h-14"
//           >
//             <Send size={24} />
//           </button>
//         </div> */}
//       </SheetContent>
//     </Sheet>
//   );
// };

// export default ChatSidebar;

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader2, Pause, Send, Volume2 } from "lucide-react";
import { LINK2 } from "@/store/Link";
import ReactMarkdownType from "react-markdown";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import VoiceInput from "./VoiceInput";

const ReactMarkdown = ReactMarkdownType as unknown as React.FC<{
  children: string;
}>;

interface Message {
  sender: "user" | "bot";
  text: string;
}

const useVoices = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const voicesList = window.speechSynthesis.getVoices();
      setVoices(voicesList);
      console.log("Available voices:");
      voicesList.forEach((v, i) =>
        console.log(`${i + 1}. ${v.name} — ${v.lang}`)
      );
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  return voices;
};

const ChatSidebar = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: `${t("chat_sidebar.opening_text.p1")} बंधु, ${t(
        "chat_sidebar.opening_text.p2"
      )}`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const voices = useVoices();

  //soham
  const [speakingMessageIdx, setSpeakingMessageIdx] = useState<number | null>(
    null
  );

  const speakText = (text: string, lang = "en-IN") => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const selectedVoice = voices.find((v) => v.lang === lang);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.lang = lang;
      utterance.rate = 1;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    } else {
      alert(t("chat_sidebar.alert"));
    }
  };

  // sendMessage now accepts autoSpeak flag
  const sendMessage = async (inp: string, autoSpeak = false) => {
    const userMessage: Message = { sender: "user", text: inp };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${LINK2}/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text, language: lang }),
      });

      const data = await response.json();

      const botMessage: Message = {
        sender: "bot",
        text: data.reply || t("chat_sidebar.process_error"),
      };

      setMessages((prev) => [...prev, botMessage]);

      // If voice input triggered this → auto play TTS
      if (autoSpeak) {
        speakText(botMessage.text, lang);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: t("chat_sidebar.server_error") },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (pathname === "/auth") return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {/* <button className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg z-50">
         🌱 
        </button> */}
        <button
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 p-2 rounded-full shadow-lg z-50
                       w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
        >
          <img
            src="/gifs/chatbot-gif.gif"
            alt="Chatbot"
            className="w-10 h-10 md:w-14 md:h-14 object-contain"
          />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex flex-col gap-0 h-full bg-white/95 backdrop-blur-md p-0 w-full max-w-[100%] sm:max-w-[80%] md:max-w-[60%] xl:max-w-[30%] "
      >
        <SheetHeader className="relative bg-green-600 text-white h-16 flex items-center justify-center px-4">
          <SheetTitle className="font-semibold text-3xl text-white mr-12">
            🌱 Bhoomiबंधु
          </SheetTitle>

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
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-[80%] relative ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white"
                    : "bg-white border border-green-200 text-gray-800"
                } prose prose-sm`}
              >
                {msg.sender === "bot" ? (
                  <div className="flex flex-col gap-1">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>

                    {/* Toggle Play/Pause button */}
                    {speakingMessageIdx !== idx ? (
                      <button
                        onClick={() => {
                          // Stop previous speech if any
                          speechSynthesis.cancel();

                          speakText(msg.text, lang);
                          setSpeakingMessageIdx(idx);

                          const checkEnd = setInterval(() => {
                            if (!speechSynthesis.speaking) {
                              setSpeakingMessageIdx(null);
                              clearInterval(checkEnd);
                            }
                          }, 200);
                        }}
                        className="mt-1 text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
                      >
                        <Volume2 size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          speechSynthesis.cancel(); // stop immediately
                          setSpeakingMessageIdx(null);
                        }}
                        className="mt-1 text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                      >
                        <Pause size={18} />
                      </button>
                    )}
                  </div>
                ) : (
                  msg.text
                )}
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

        {/* Input area */}
        <div className="flex items-center border-t border-gray-300 bg-green-200 pt-3 px-0 md:p-4">
          <input
            type="text"
            placeholder={t("chat_sidebar.placeholder")}
            className="flex-1 px-3 py-2 rounded-none md:rounded-l-lg focus:outline-none border h-12 text-sm sm:text-base"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={
              (e) =>
                e.key === "Enter" && sendMessage(e.currentTarget.value, false) // 👈 text input → autoSpeak = false
            }
          />
          <VoiceInput
            onTranscribe={(text) => {
              setInput(text);
              sendMessage(text, true); // 👈 voice input → autoSpeak = true
            }}
          />
          <button
            onClick={() => {
              sendMessage(input, false); // 👈 text input → autoSpeak = false
            }}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center w-12 h-12 rounded-none md:rounded-r-lg"
          >
            <Send className="sm:w-6 sm:h-6" />
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatSidebar;
