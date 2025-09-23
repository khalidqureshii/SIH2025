import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Volume2 } from "lucide-react";
import { motion } from "framer-motion";

const safeParseDate = (v: any) => {
  if (v instanceof Date) return v;
  const d = new Date(v);
  if (!isNaN(d.getTime())) return d;
  return null;
};

const useDateFormatter = () => {
  const { t, i18n } = useTranslation();

  const dayNames = t(`popover.weekdays.long`, { returnObjects: true }) as
    | string[]
    | undefined;
  const monthNames = t(`popover.months.long`, { returnObjects: true }) as
    | string[]
    | undefined;

  const isIntlSupported = (() => {
    try {
      const testDate = new Date(Date.UTC(2023, 0, 1));
      const formatted = new Intl.DateTimeFormat(i18n.language, {
        weekday: "long",
      }).format(testDate);
      return !/^[A-Za-z]+$/.test(formatted);
    } catch {
      return false;
    }
  })();

  return (raw: any) => {
    const d = safeParseDate(raw);
    if (!d) return String(raw ?? "");

    if (isIntlSupported) {
      const day = new Intl.DateTimeFormat(i18n.language, {
        weekday: "long",
      }).format(d);
      const newDate = new Intl.DateTimeFormat(i18n.language, {
        day: "numeric",
        month: "long",
      }).format(d);
      return `${day}, ${newDate}`;
    }

    const day = dayNames && dayNames.length ? dayNames[d.getDay()] : undefined;
    const month =
      monthNames && monthNames.length ? monthNames[d.getMonth()] : undefined;
    const newDate = `${d.getDate()}${month ? ` ${month}` : ""}`;
    return `${day ? `${day}, ` : ""}${newDate}`;
  };
};

const useVoices = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const voicesList = window.speechSynthesis.getVoices();
      setVoices(voicesList);
      // console.log("Available voices:");
      // voicesList.forEach((v, i) =>
      //   console.log(`${i + 1}. ${v.name} — ${v.lang}`)
      // );
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  return voices;
};

interface CarouselCardProps {
  dayData: any;
  location: any;
  advisory?: any;
  date: any;
}

const CarouselCard: React.FC<CarouselCardProps> = (props) => {
  const { dayData, advisory, date } = props;
  const { t } = useTranslation();
  const formatDate = useDateFormatter();

  const voices = useVoices();

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

  const advisoryText = (() => {
    if (!advisory) return null;
    if (typeof advisory === "string") return advisory;
    if (advisory?.advice) return advisory.advice;

    const possible = Object.values(advisory).find((v) => typeof v === "string");
    return possible ?? null;
  })();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-br from-sky-100 via-white to-blue-50 rounded-3xl shadow-lg p-5 flex flex-col gap-5 h-full border border-sky-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <p className="text-gray-600 text-sm">{formatDate(date)}</p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-tr from-sky-50 to-blue-100 shadow-inner">
          <img
            src={`https:${dayData.condition.icon}`}
            alt={dayData.condition.text}
            className="w-12 h-12"
          />
        </div>
        <p className="text-base font-semibold text-gray-700">
          {dayData.condition.text}
        </p>
        <p className="text-3xl font-extrabold text-gray-800">
          {dayData.avgtemp_c}°C
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs text-gray-700">
        {[
          { icon: "🌡️", label: t("card.max_temp"), value: `${dayData.maxtemp_c}°C` },
          { icon: "❄️", label: t("card.min_temp"), value: `${dayData.mintemp_c}°C` },
          { icon: "🌬️", label: t("card.wind"), value: `${dayData.maxwind_kph} kph` },
          { icon: "💧", label: t("card.humidity"), value: `${dayData.avghumidity}%` },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(14,165,233,0.3)" }}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-br from-sky-50 to-blue-100 shadow-sm text-center"
          >
            <p className="text-lg">{item.icon}</p>
            <p className="font-medium">{item.label}</p>
            <p className="text-gray-900 font-semibold">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {advisoryText && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
          className="mt-auto bg-gradient-to-br from-sky-50 to-blue-100 rounded-xl p-4 shadow-inner"
        >
          <p className="text-gray-800 text-sm leading-relaxed font-medium text-center">
            {advisoryText}
          </p>
          <div className="flex justify-center items-center">
            <button
              onClick={() => speakText(advisoryText, "hi-IN")}
              className="mt-3 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-200 to-blue-300 text-gray-800 font-semibold rounded-xl shadow-md hover:from-sky-300 hover:to-blue-400 hover:shadow-lg transition-all duration-300"
            >
              <Volume2 className="w-4 h-4" />
              {t("carousel.listen")}
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CarouselCard;
