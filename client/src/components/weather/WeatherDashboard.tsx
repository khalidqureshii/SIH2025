import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import InputField from "./InputField";
import Label from "./Label";
import Button from "./Button";
import Card from "./Card";
import Timeline from "./Timeline";
import Graphs from "./Graphs";
import PopOver from "./PopOver";
import { LINK, LOCAL_LINK } from "@/store/Link";

interface WeatherApiResponse {
  location: {
    name: string;
    region: string;
    country: string;
  };
  forecast: {
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
  }[];
  advisory_from_ai: string[];
}

interface WeatherDashboardProp {
  city: string;
  cityChanged: (newCity: string) => void;
}

const WeatherDashboard: React.FC<WeatherDashboardProp> = ({
  city,
  cityChanged,
}) => {
  const { t, i18n } = useTranslation();

  const [newCity, setNewCity] = useState(city);
  const [data, setData] = useState<WeatherApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return;
      setLoading(true);
      setError(null);
      try {
        // const response = await fetch(`http://localhost:3000/api/weather/advisory?q=${city}`);
        const response = await fetch(
          `${LOCAL_LINK}/api/weather/advisory?q=${city}&lang=${i18n.language}`
        );
        // const response = await fetch(
        //   `${LINK}/api/weather/advisory?q=${city}&lang=${i18n.language}`
        // );
        if (!response.ok) throw new Error("Failed to fetch weather data");
        const result = await response.json();
        // console.log("API Response:", result);

        if (result && Array.isArray(result.forecast)) {
          const transformedForecast = result.forecast.map((day: any) => {
            const { hour, ...restOfDay } = day;
            return restOfDay;
          });

          const transformedData = {
            ...result,
            forecast: transformedForecast,
          };
          setData(transformedData);
        } else {
          setData(result);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, i18n.language]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    cityChanged(newCity);
  };

  const handleDetectLocation = () => {
    if (!("geolocation" in navigator)) {
      alert(t("dashboard.alerts.geolocation"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const locationData = await res.json();
          const detectedCity =
            locationData.address.city ||
            locationData.address.town ||
            locationData.address.village ||
            "";

          if (detectedCity) {
            setNewCity(detectedCity);
            cityChanged(detectedCity);
          } else {
            alert(t("dashboard.alerts.detect_failed1"));
          }
        } catch (err) {
          console.error("Reverse geocoding failed:", err);
          alert(t("dashboard.alerts.detect_failed2"));
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert(t("dashboard.alerts.detect_failed3"));
      }
    );
  };

  return (
    <div className="w-full px-2 md:px-4">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
        <div className="flex flex-row justify-between items-center md:col-span-2 p-2 bg-transparent rounded">
          <div className="flex items-center gap-4">
            <Label htmlFor="city-entry" labelName={t("dashboard.city")} />
            <InputField
              placeHolder={t("dashboard.placeholder")}
              id="city-entry"
              value={newCity}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewCity(e.target.value)
              }
            />
            <Button
              type="button"
              name={t("dashboard.detect")}
              className="bg-red-700 hover:bg-red-600 whitespace-nowrap"
              onClick={handleDetectLocation}
            />
          </div>
          <div>
            <Button
              type="submit"
              name={t("dashboard.submit")}
              className="bg-emerald-600 hover:bg-green-500 whitespace-nowrap"
            />
          </div>
        </div>

        <div className="p-2 bg-transparent border-0 rounded shadow flex justify-center items-center">
          <Card loading={loading} error={error} data={data} />
        </div>
        <div className="p-2 bg-transparent rounded shadow">
          <Graphs data={data} loading={loading} error={error} />
        </div>
        <div className="md:col-span-2 p-2 bg-transparent rounded flex justify-center items-center">
          <Timeline loading={loading} error={error} forecast={data?.forecast || []} />
        </div>
        <div className="md:col-span-2 p-2 mt-8 bg-transparent rounded">
          <PopOver data={data} loading={loading} error={error} />
        </div>
      </form>
    </div>
  );
};

export default WeatherDashboard;
