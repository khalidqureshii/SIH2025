import React, { useState, useEffect } from "react";
import Button from "../components/weather/Button";
import WeatherDashboard from "../components/weather/WeatherDashboard";
import Loader from "@/components/common/Loader";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";

const Weather: React.FC = () => {
  const { t } = useTranslation();

  const [city, setCity] = useState("");
  const [citySubmitted, setCitySubmitted] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const res = await fetch(
              `https://us1.locationiq.com/v1/reverse?key=${
                import.meta.env.VITE_LOCATIONIQ_ACCESS_TOKEN
              }&lat=${latitude}&lon=${longitude}&format=json`
            );

            const data = await res.json();
            const detectedCity =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "";

            if (isMounted && detectedCity) {
              setCity(detectedCity);
              setCitySubmitted(detectedCity);
            }
          } catch (err) {
            console.error("Reverse geocoding failed:", err);
          } finally {
            if (isMounted) setLoading(false);
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
          if (isMounted) setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    setCitySubmitted(city);
    console.log(city);
  };

  if (loading) {
    return (
      <Loader
        src="https://lottie.host/28849d46-6262-42ec-be27-deea2d9ae9a0/ZgKbMCHk1g.lottie"
        message={t("weather.loader_message")}
        className="h-screen w-screen"
        animationClassName="w-96 md:w-[28rem]"
      />
    );
  }

  return (
    <>
      {!citySubmitted ? (
        <div className="flex justify-center items-center mx-auto px-4 min-h-screen w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center p-6 rounded-2xl shadow-md w-72 sm:w-80 md:w-96 lg:w-[28rem] min-h-60 sm:min-h-80 md:h-[20rem] lg:h-[26rem] bg-white/60 backdrop-blur"
          >
            <h1 className="text-2xl font-semibold text-center p-4 mt-6">
              🌦️ {t("weather.form_header")}
            </h1>
            <div className="flex-grow flex flex-col justify-center items-center gap-10 w-full">
              <Input
                id="city"
                className="w-[80%]"
                placeholder={t("weather.placeholder")}
                value={city}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCity(e.target.value)
                }
              />
              <Button
                type="submit"
                name={t("weather.submit")}
                className="mt-4 w-56 bg-green-600 hover:bg-green-700 text-white"
              />
            </div>
          </form>
        </div>
      ) : (
        <WeatherDashboard city={city} cityChanged={setCity} />
      )}
    </>
  );
};

export default Weather;
