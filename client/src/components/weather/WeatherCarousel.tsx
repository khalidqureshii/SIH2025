import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Loader from "../common/Loader";
import { useTranslation } from "react-i18next";
import { Volume2, Thermometer, ArrowDown, Wind, Droplet } from "lucide-react";

interface CarouselProps {
  loading: boolean;
  error: string | null;
  data: any;
}

const useVoices = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  useEffect(() => {
    const loadVoices = () => {
      const voicesList = window.speechSynthesis.getVoices();
      setVoices(voicesList);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);
  return voices;
};

const WeatherCarousel: React.FC<CarouselProps> = ({ loading, error, data }) => {
  const { t, i18n } = useTranslation();
  const voices = useVoices();

  const speakText = (text: string, lang = "en-IN") => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const selectedVoice = voices.find((v) => v.lang === lang);
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.lang = lang;
      utterance.rate = 1;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  if (loading)
    return (
      <Loader
        src="https://lottie.host/01848d62-d139-4d8a-9604-2c12b27a4812/86nGzKRHDL.lottie"
        message={t("card.loader_message")}
      />
    );
  if (error)
    return (
      <div className="p-3 max-w-xs mx-auto bg-red-100 text-red-800 rounded-lg shadow">
        {error}
      </div>
    );
  if (!data) return null;

  const forecastDays = data.forecast || [];
  const advisoryDays = data.advisory_from_ai || [];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = new Intl.DateTimeFormat(i18n.language, {
      weekday: "short",
    }).format(date);
    const newDate = new Intl.DateTimeFormat(i18n.language, {
      day: "numeric",
      month: "short",
    }).format(date);
    return { day, newDate };
  };

  return (
    <div className="w-full max-w-6xl mx-auto relative px-3">
      {/* Carousel container */}
      <Carousel className="w-full">
        {/* Navigation buttons (overlayed) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 z-20">
          <div className="pointer-events-auto">
            <div className="rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white border border-indigo-500/10 shadow-2xl p-1.5 hover:scale-105 hover:from-indigo-700 hover:to-sky-600 transition ring-1 ring-indigo-200/20">
              <CarouselPrevious aria-label="Previous day" />
            </div>
          </div>

          <div className="pointer-events-auto">
            <div className="rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white border border-indigo-500/10 shadow-2xl p-1.5 hover:scale-105 hover:from-indigo-700 hover:to-sky-600 transition ring-1 ring-indigo-200/20">
              <CarouselNext aria-label="Next day" />
            </div>
          </div>
        </div>

        <CarouselContent>
          {forecastDays.slice(0, 7).map((dayData: any, idx: number) => {
            const { day, newDate } = formatDate(dayData.date);
            const advisory = advisoryDays[idx]?.advice || t("popover.no_advice");

            return (
              <CarouselItem
                key={idx}
                className="md:basis-1/2 lg:basis-1/3 flex justify-center"
              >
                <div className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-white/60 to-sky-50/60 border border-white/30 backdrop-blur-sm shadow-2xl p-6 flex flex-col gap-4 transform transition hover:-translate-y-1 hover:scale-[1.025]">

                  {/* Decorative top strip */}
                  <div className="-mx-6 mb-2 rounded-t-3xl overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500/80"></div>
                  </div>

                  {/* Date */}
                  <div className="text-center">
                    <p className="text-base font-semibold text-slate-800">{newDate}</p>
                    <p className="text-xs text-slate-500">{day}</p>
                  </div>

                  {/* Weather Info */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center bg-white/60 border border-white/40 shadow-inner">
                      <img
                        src={dayData.day.condition.icon}
                        alt={dayData.day.condition.text}
                        className="w-12 h-12"
                      />
                    </div>

                    <p className="text-3xl font-extrabold leading-none text-sky-700">{dayData.day.avgtemp_c}°C</p>
                    <p className="text-sm text-slate-600 italic">{dayData.day.condition.text}</p>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                  {/* Extra Details */}
                  <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">
                    <div className="bg-white/40 p-3 rounded-xl flex flex-col items-center gap-2 border border-white/30">
                      <div className="flex items-center gap-2 text-sky-700">
                        <Thermometer className="w-4 h-4" />
                        <p className="font-medium text-xs">{t("card.max_temp")}</p>
                      </div>
                      <p className="text-sm font-semibold">{dayData.day.maxtemp_c}°C</p>
                    </div>

                    <div className="bg-white/40 p-3 rounded-xl flex flex-col items-center gap-2 border border-white/30">
                      <div className="flex items-center gap-2 text-sky-700">
                        <ArrowDown className="w-4 h-4" />
                        <p className="font-medium text-xs">{t("card.min_temp")}</p>
                      </div>
                      <p className="text-sm font-semibold">{dayData.day.mintemp_c}°C</p>
                    </div>

                    <div className="bg-white/40 p-3 rounded-xl flex flex-col items-center gap-2 border border-white/30">
                      <div className="flex items-center gap-2 text-sky-700">
                        <Wind className="w-4 h-4" />
                        <p className="font-medium text-xs">{t("card.wind")}</p>
                      </div>
                      <p className="text-sm font-semibold">{dayData.day.maxwind_kph} km/h</p>
                    </div>

                    <div className="bg-white/40 p-3 rounded-xl flex flex-col items-center gap-2 border border-white/30">
                      <div className="flex items-center gap-2 text-sky-700">
                        <Droplet className="w-4 h-4" />
                        <p className="font-medium text-xs">{t("card.humidity")}</p>
                      </div>
                      <p className="text-sm font-semibold">{dayData.day.avghumidity}%</p>
                    </div>
                  </div>

                  {/* Advisory Section */}
                    <div className="mt-3 p-4 rounded-2xl bg-gradient-to-br from-emerald-50/60 via-emerald-100/50 to-white/60 border border-emerald-200/40 shadow-inner">
                    <p className="text-slate-800 text-sm leading-relaxed font-medium line-clamp-4">
                        {advisory}
                    </p>

                    <div className="mt-3 flex justify-center">
                        <button
                        onClick={() => speakText(advisory, "hi-IN")}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-white/95 border border-emerald-200 text-emerald-800 text-sm font-semibold rounded-full shadow-sm hover:scale-105 transition ring-1 ring-emerald-100/60"
                        aria-label={t("carousel.listen") as string}
                        >
                        <Volume2 className="w-5 h-5" />
                        {t("carousel.listen")}
                        </button>
                    </div>
                    </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* Optional small pager / hint */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
        <span className="inline-block w-2 h-2 rounded-full bg-slate-300/80" />
        <span className="inline-block w-2 h-2 rounded-full bg-slate-300/40" />
        <span className="inline-block w-2 h-2 rounded-full bg-slate-300/40" />
      </div>
    </div>
  );
};

export default WeatherCarousel;