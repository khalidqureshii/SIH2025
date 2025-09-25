import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaMicrophone, FaStop } from "react-icons/fa";

interface VoiceInputProps {
  onTranscribe?: (text: string) => void; // optional callback
}

export default function VoiceInput({ onTranscribe }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const { i18n } = useTranslation();
  const lang = i18n.language;
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      if (lang !== "en") recog.lang = "hi-IN";
      else recog.lang = `en-IN`; // 👈 default language, can change dynamically

      recog.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log("Heres what you just said: ", transcript);
        if (onTranscribe) {
          onTranscribe(transcript); // send recognized text back to parent
        }
        setIsRecording(false);
      };

      recog.onerror = () => setIsRecording(false);
      setRecognition(recog);
    }
  }, [onTranscribe]);

  const toggleRecording = () => {
    if (!recognition) return;
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
    }
  };

  return (
    <button
      onClick={toggleRecording}
      className={`
text-green-600 flex items-center justify-center w-12 h-12 rounded-none ${
        isRecording
          ? "text-red-600 hover:text-red-700 animate-pulse"
          : "text-green-600 hover:text-green-700"
        // ? "bg-red-600 hover:bg-red-700 animate-pulse"
        // : "bg-green-600 hover:bg-green-700"
      } bg-white`}
    >
      {isRecording ? <FaStop size={18} /> : <FaMicrophone size={20} />}
    </button>
  );
}
