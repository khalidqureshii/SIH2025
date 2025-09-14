import React from "react";
import Loader from "./Loader";
import { parseISO } from "date-fns";
import { useTranslation } from "react-i18next";

interface WeatherDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    daily_chance_of_rain: number;
    totalprecip_mm: number;
    avghumidity: number;
    maxwind_kph: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

interface TimelineProps {
  forecast: WeatherDay[];
  loading: boolean;
  error: string | null;
}

const Timeline: React.FC<TimelineProps> = ({ forecast, loading, error }) => {
  const { t, i18n } = useTranslation();

  if (loading)
    return (
      <Loader
        src="https://lottie.host/2e87f684-6d24-4ea6-944a-a1eafe942056/bRhcBCiAo6.lottie"
        message={t("timeline.loader_message")}
      />
    );

  if (error)
    return (
      <div className="p-4 max-w-sm mx-auto bg-red-100 text-red-800 rounded-lg shadow">
        {error}
      </div>
    );

  if (!forecast) return null;

  // const isLanguageSupported = (lang: string) => {
  //   try {
  //     new Intl.DateTimeFormat(lang);
  //     return true;
  //   } catch {
  //     return false;
  //   }
  // };

  // const currentLang = isLanguageSupported(i18n.language) ? i18n.language : "en-US";

  // const formatDayLabel = (dateStr: string, index: number) => {
  //   const date = parseISO(dateStr);

  //   if (index === 0) return t("timeline.day_format_label.today");
  //   if (index === 1) return t("timeline.day_format_label.tomorrow");

  //   return new Intl.DateTimeFormat(currentLang, {
  //     weekday: "short",
  //     day: "numeric",
  //     month: "short",
  //   }).format(date);
  // };


  const isIntlSupported = (() => {
    const testDate = new Date(Date.UTC(2023, 0, 1));
    const formatted = new Intl.DateTimeFormat(i18n.language, { weekday: "short" }).format(
      testDate
    );
    return !/^[A-Za-z]+$/.test(formatted);
  })();

  const formatDayLabel = (dateStr: string, index: number) => {
    const date = parseISO(dateStr);

    if (index === 0) return t("timeline.day_format_label.today");
    if (index === 1) return t("timeline.day_format_label.tomorrow");

    if (isIntlSupported) {
      return new Intl.DateTimeFormat(i18n.language, {
        weekday: "short",
        day: "numeric",
        month: "short",
      }).format(date);
    }

    const dayIndex = date.getDay();
    const monthIndex = date.getMonth();

    let dayNames: string[] = t(`timeline.weekdays.short`, { returnObjects: true }) as string[];
    let monthNames: string[] = t(`timeline.months.short`, { returnObjects: true }) as string[];

    if (!dayNames || !dayNames.length) {
      dayNames = t(`timeline.weekdays.short`, { lng: "en", returnObjects: true }) as string[];
    }
    if (!monthNames || !monthNames.length) {
      monthNames = t(`timeline.months.short`, { lng: "en", returnObjects: true }) as string[];
    }

    const dayName = dayNames[dayIndex] || "";
    const monthName = monthNames[monthIndex] || "";

    return `${dayName}, ${date.getDate()} ${monthName}`;
  };

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
      <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>

      <div className="flex overflow-x-auto gap-4 px-4 py-6 scroll-smooth snap-x snap-mandatory scrollbar-hide">
        {forecast.map((day, index) => {
          const risk =
            day.day.maxwind_kph > 40
              ? t("timeline.risk_labels.high_winds")
              : day.day.daily_chance_of_rain > 80
              ? t("timeline.risk_labels.thunderstorm")
              : t("timeline.risk_labels.no_warnings");

          return (
            <div
              key={day.date}
              className="flex-shrink-0 snap-center w-40 p-4 rounded-2xl shadow-md bg-white text-center"
            >
              <p className="text-sm font-semibold text-gray-700">
                {formatDayLabel(day.date, index)}
              </p>

              <img
                src={`https:${day.day.condition.icon}`}
                alt={day.day.condition.text}
                className="w-12 h-12 mx-auto my-2"
              />

              <p className="text-lg font-bold">
                {Math.round(day.day.maxtemp_c)}° /{" "}
                <span className="text-gray-500">
                  {Math.round(day.day.mintemp_c)}°
                </span>
              </p>

              <p className="text-sm text-blue-600">
                {day.day.daily_chance_of_rain}
                {t("timeline.rain_label")}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {t("timeline.humidity_label")}
                {day.day.avghumidity}%
              </p>

              {risk && (
                <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                  {risk}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
