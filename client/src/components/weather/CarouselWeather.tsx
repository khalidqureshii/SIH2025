import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarouselCard from "./CarouselCard";
import Loader from "../common/Loader";
import { useTranslation } from "react-i18next";

interface CarouselWeatherProps {
  loading: boolean;
  error: string | null;
  data: any;
}

const CarouselWeather: React.FC<CarouselWeatherProps> = (props) => {
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

  const locationData = data.location;
  const advisories = Array.isArray(data.advisory_from_ai) ? data.advisory_from_ai : [];

  const getAdvisoryForForecast = (forecastItem: any, index: number) => {
    const dayDate = forecastItem?.day?.date ?? forecastItem?.date ?? null;

    if (dayDate) {
      const matched = advisories.find((adv: any) => {
        const advDate = adv?.date ?? adv?.day_date ?? null;
        return advDate && String(advDate) === String(dayDate);
      });
      if (matched) return matched;
    }

    if (advisories[index]) return advisories[index];

    return null;
  };

  return (
    <div className="w-full">
      <Carousel className="relative w-full max-w-6xl mx-auto group">
        <CarouselContent>
          {data.forecast.map((forecastItem: any, index: number) => {
            const advisory = getAdvisoryForForecast(forecastItem, index);
            const dayData = forecastItem.day ?? forecastItem;
            const date = forecastItem.date;
            return (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <CarouselCard
                  date={date}
                  dayData={dayData}
                  location={locationData}
                  advisory={advisory}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious
          className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 
          w-10 h-10 flex items-center justify-center 
          rounded-full bg-white/80 shadow-md !opacity-0 
          group-hover:!opacity-100 transition duration-300"
        />
        <CarouselNext
          className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 
          w-10 h-10 flex items-center justify-center 
          rounded-full bg-white/80 shadow-md !opacity-0 
          group-hover:!opacity-100 transition duration-300"
        />
      </Carousel>
    </div>
  );
};

export default CarouselWeather;
