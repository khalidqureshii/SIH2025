import React from "react";
import Loader from "../common/Loader";
import { useTranslation } from "react-i18next";

interface CardInterface {
  loading: boolean;
  error: string | null;
  data: any;
}

const Card: React.FC<CardInterface> = (props) => {
  const { loading, error, data } = props;
  const { t } = useTranslation();

  if (loading)
    return (
      <Loader
        src="https://lottie.host/f2784c2b-d89d-4b1d-9176-2c3c43a1f57e/eI03PSK8Bi.lottie"
        message={t("card.loader_message")}
      />
    );
  if (error)
    return (
      <div className="p-4 max-w-sm mx-auto bg-red-100 text-red-800 rounded-lg shadow">
        {error}
      </div>
    );
  if (!data) return null;

  const dayData = data.forecast[0].day;
  const locationData = data.location;

  const localTime = new Date(locationData.localtime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="w-full max-w-[26rem] mx-auto bg-gradient-to-br from-cyan-900 to-blue-400 text-white rounded-2xl shadow-lg p-6">
      <div dir="ltr" className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold">{locationData.name}</h2>
          <p className="text-sm text-blue-100">{localTime}</p>
          <p className="text-7xl font-extrabold mt-2">{dayData.avgtemp_c}°</p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={`https:${dayData.condition.icon}`}
            alt={dayData.condition.text}
            className="w-24 h-24"
          />
          <p className="text-center font-semibold text-sm">
            {dayData.condition.text}
          </p>
        </div>
      </div>

      <div className="border-t border-blue-300/50 my-4"></div>

      <div dir="ltr" className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
        <div className="flex flex-col items-center">
          <span className="text-blue-200">{t("card.max_temp")}</span>
          <span className="font-bold text-lg">{dayData.maxtemp_c}°</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-blue-200">{t("card.min_temp")}</span>
          <span className="font-bold text-lg">{dayData.mintemp_c}°</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-blue-200">{t("card.wind")}</span>
          <span className="font-bold text-lg">
            {dayData.maxwind_kph} km/h
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-blue-200">{t("card.humidity")}</span>
          <span className="font-bold text-lg">{dayData.avghumidity}%</span>
        </div>
      </div>
    </div>
  );
};

export default Card;