import React, {useState, useEffect} from "react"
import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import Loader from "./Loader";
import { useTranslation } from "react-i18next";
import { Volume2 } from "lucide-react";

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

interface PopoverProps{
    loading: boolean;
    error: string | null;
    data: any;
}

interface Advisory{
    date: string;
    advice: string;
}

const PopOver: React.FC<PopoverProps> = (props) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    
    const { t, i18n } = useTranslation();
    const {loading, error, data} = props;
    const voices = useVoices(); // ✅ safe now

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
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };
    
    if (loading) return <Loader src="https://lottie.host/01848d62-d139-4d8a-9604-2c12b27a4812/86nGzKRHDL.lottie" 
    message={t("popover.loader_message")} />;
    if (error) return <div className="p-4 max-w-sm mx-auto bg-red-100 text-red-800 rounded-lg shadow">{error}</div>;
    if (!data) return null;

    console.log(data.advisory_from_ai[0].advice);

    const helperVar: Advisory[] = data.advisory_from_ai;

    const isIntlSupported = (() => {
    const testDate = new Date(Date.UTC(2023, 0, 1));
    const formatted = new Intl.DateTimeFormat(i18n.language, { weekday: "long" }).format(
      testDate
    );
    return !/^[A-Za-z]+$/.test(formatted);
  })();

  const formatDateLabels = (dateStr: string) => {
    const date = new Date(dateStr);

    if (isIntlSupported) {
      const day = new Intl.DateTimeFormat(i18n.language, { weekday: "long" }).format(date);
      const newDate = new Intl.DateTimeFormat(i18n.language, {
        day: "numeric",
        month: "short",
      }).format(date);
      return { day, newDate };
    }

    const dayIndex = date.getDay();
    const monthIndex = date.getMonth();

    let dayNames: string[] = t(`popover.weekdays.long`, { returnObjects: true }) as string[];
    let monthNames: string[] = t(`popover.months.short`, { returnObjects: true }) as string[];;

    if (!dayNames || !dayNames.length) {
      dayNames = t(`popover.weekdays.long`, { lng: "en", returnObjects: true }) as string[];;
    }
    if (!monthNames || !monthNames.length) {
      monthNames = t(`popover.months.short`, { lng: "en", returnObjects: true }) as string[];
    }

    const day = dayNames[dayIndex] || "";
    const newDate = `${date.getDate()} ${monthNames[monthIndex] || ""}`;
    return { day, newDate };
  };

    return(
        <>
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-gray-800">
                {t("popover.title")}
            </h2>

            <div className="relative w-full min-h-[35vh] flex items-center justify-center p-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-8 place-items-center">

                {helperVar.map((adv: Advisory, index: number) => {
                    // const date = new Date(adv.date);
                    // const opts1: Intl.DateTimeFormatOptions = { weekday: "long" };
                    // const opts2: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
                    // const day = date.toLocaleDateString(t("popover.date_locale"), opts1);
                    // const newDate = date.toLocaleDateString(t("popover.date_locale"), opts2);
                    const { day, newDate } = formatDateLabels(adv.date);

                    return (
                    <Popover
                        key={index}
                        onOpenChange={(open:any) => {
                        if (open) {
                            setSelectedIndex(index);
                        } else if (selectedIndex === index) {
                            setSelectedIndex(null);
                        }
                        }}
                    >
                        <PopoverTrigger asChild>
                            <div
                                className={`cursor-pointer flex flex-col items-center justify-center 
                                rounded-3xl border px-6 py-8 transition duration-300 ease-in-out 
                                shadow-md hover:scale-105 text-center w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44
                                ${
                                    selectedIndex === index
                                    ? "bg-gradient-to-br from-sky-300 via-blue-400 to-blue-600 text-white border-blue-600 ring-2 ring-blue-400 shadow-2xl"
                                    : "bg-gradient-to-br from-green-50 via-sky-100 to-blue-100 text-gray-800 border-gray-300 hover:shadow-lg"
                                }`}
                            >
                            <p
                                className={`text-xl font-bold ${
                                    selectedIndex === index ? "text-white drop-shadow-sm" : "text-gray-900"
                                }`}
                            >
                                {newDate}
                            </p>
                                <span
                                    className={`mt-2 text-base font-medium ${
                                        selectedIndex === index ? "text-yellow-100" : "text-gray-600"
                                    }`}
                                >
                                    {day}
                                </span>
                            </div>
                        </PopoverTrigger>
                        {/* <PopoverContent
                            side="bottom"
                            align="center"
                            className="w-80 p-6 bg-gradient-to-br from-white via-yellow-50 to-orange-50 rounded-3xl shadow-xl border border-gray-200"
                            >
                            <p className="text-gray-800 text-lg leading-relaxed font-medium">
                                {adv.advice}
                            </p>
                        </PopoverContent> */}
                        <PopoverContent
                  side="bottom"
                  align="center"
                  className="w-80 p-6 bg-gradient-to-br from-white via-sky-50 to-blue-50 rounded-3xl shadow-xl border border-gray-200"
                >
                  <div className="flex flex-col gap-4">
                    <p className="text-gray-800 text-lg leading-relaxed font-medium">
                      {adv.advice}
                    </p>
                    <button
                      onClick={() => speakText(adv.advice, "hi-IN")}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-100 to-blue-200 text-gray-800 font-medium rounded-2xl shadow-md hover:from-sky-200 hover:to-blue-300 transition"
                    >
                      <Volume2 className="w-5 h-5" />
                      {t("carousel.listen")}
                    </button>
                  </div>
                </PopoverContent>
                    </Popover>
                    );
                })}
                </div>
            </div>
        </>
    )
}

export default PopOver;