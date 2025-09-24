// import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
// import { useTranslation } from "react-i18next";
// import InputField from "./InputField";
// import { LINK } from "@/store/Link";
// import CarouselWeather from "./CarouselWeather";
// import Graphs from "./Graphs";
// import { Button } from "@/components/ui/button";
// import { MapPin, Send } from "lucide-react";

// interface WeatherApiResponse {
//   location: {
//     name: string;
//     region: string;
//     country: string;
//   };
//   forecast: {
//     date: string;
//     day: {
//       maxtemp_c: number;
//       mintemp_c: number;
//       daily_chance_of_rain: number;
//       totalprecip_mm: number;
//       avghumidity: number;
//       maxwind_kph: number;
//       condition: {
//         text: string;
//         icon: string;
//       };
//     };
//   }[];
//   advisory_from_ai: string[];
// }

// interface WeatherDashboardProp {
//   city: string;
//   cityChanged: (newCity: string) => void;
// }

// const WeatherDashboard: React.FC<WeatherDashboardProp> = ({
//   city,
//   cityChanged,
// }) => {
//   const { t, i18n } = useTranslation();

//   const [newCity, setNewCity] = useState(city);
//   const [data, setData] = useState<WeatherApiResponse | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchWeather = async () => {
//       if (!city) return;
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(
//           `${LINK}/api/weather/advisory?q=${city}&lang=${i18n.language}`
//         );
//         if (!response.ok) throw new Error("Failed to fetch weather data");
//         const result = await response.json();

//         if (result && Array.isArray(result.forecast)) {
//           const transformedForecast = result.forecast.map((day: any) => {
//             const { hour, ...restOfDay } = day;
//             return restOfDay;
//           });

//           const transformedData = {
//             ...result,
//             forecast: transformedForecast,
//           };
//           setData(transformedData);
//         } else {
//           setData(result);
//         }
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWeather();
//   }, [city, i18n.language]);

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     cityChanged(newCity);
//   };

//   const handleDetectLocation = () => {
//     if (!("geolocation" in navigator)) {
//       alert(t("dashboard.alerts.geolocation"));
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         try {
//           const res = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//           );
//           const locationData = await res.json();
//           const detectedCity =
//             locationData.address.city ||
//             locationData.address.town ||
//             locationData.address.village ||
//             "";

//           if (detectedCity) {
//             setNewCity(detectedCity);
//             cityChanged(detectedCity);
//           } else {
//             alert(t("dashboard.alerts.detect_failed1"));
//           }
//         } catch (err) {
//           console.error("Reverse geocoding failed:", err);
//           alert(t("dashboard.alerts.detect_failed2"));
//         }
//       },
//       (error) => {
//         console.error("Geolocation error:", error);
//         alert(t("dashboard.alerts.detect_failed3"));
//       }
//     );
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 px-2 md:px-4 py-6">

//       <div className="w-full flex justify-center">
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col w-full gap-0"
//         >
//           <div className="w-full">
//             <div className="rounded-lg border border-slate-700/40 bg-gradient-to-b from-white/3 to-white/2">
//               <div className="flex flex-wrap items-center gap-2 justify-center">
//                 <div className="flex-1 min-w-[120px] max-w-[300px]">
//                   <InputField
//                     placeHolder={t("dashboard.placeholder")}
//                     id="city-entry"
//                     value={newCity}
//                     onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                       setNewCity(e.target.value)
//                     }
//                     className="w-full h-12"
//                   />
//                 </div>

//                 <div className="flex-none w-[90px] sm:w-[110px]">
//                   <Button
//                     type="submit"
//                     className="w-full h-10 bg-blue-700 text-white flex items-center justify-center gap-2 whitespace-nowrap hover:bg-blue-600 hover:scale-105 transition-transform duration-200"
//                   >
//                     <Send className="h-5 w-5" />
//                     <span className="hidden sm:inline">{t("dashboard.submit")}</span>
//                   </Button>
//                 </div>

//                 <div className="flex-none w-[90px] sm:w-[110px]">
//                   <Button
//                     type="button"
//                     onClick={handleDetectLocation}
//                     className="w-full h-10 bg-blue-700 text-white flex items-center justify-center gap-2 whitespace-nowrap hover:bg-blue-600 hover:scale-105 transition-transform duration-200"
//                     aria-label={t("dashboard.detect") as string}
//                   >
//                     <MapPin className="h-5 w-5" />
//                     <span className="hidden sm:inline">{t("dashboard.detect")}</span>
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>

//       <div className="w-full flex justify-center">
//         <div className="w-full px-5">
//           <CarouselWeather loading={loading} error={error} data={data} />
//         </div>
//       </div>

//       <div className="w-full flex justify-center">
//         <div className="w-full px-5">
//           <Graphs loading={loading} error={error} data={data} className="w-full" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeatherDashboard;



import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import InputField from "./InputField";
import { LINK } from "@/store/Link";
import CarouselWeather from "./CarouselWeather";
import Graphs from "./Graphs";
import { Button } from "@/components/ui/button";
import { MapPin, Send } from "lucide-react";

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
        const response = await fetch(
          `${LINK}/api/weather/advisory?q=${city}&lang=${i18n.language}`
        );
        if (!response.ok) throw new Error("Failed to fetch weather data");
        const result = await response.json();

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
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 px-2 md:px-4 py-6">
      
      {/* ✅ Form aligned with carousel & graphs */}
      <div className="w-full flex justify-center">
        <div className="w-full px-5">
          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-0">
            <div className="w-full">
              <div className="rounded-lg border border-slate-700/40 bg-gradient-to-b from-white/3 to-white/2">
                <div className="flex flex-wrap items-center gap-2 justify-center">
                  {/* Input Field */}
                  <div className="flex-1 min-w-[120px] max-w-[300px]">
                    <InputField
                      placeHolder={t("dashboard.placeholder")}
                      id="city-entry"
                      value={newCity}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setNewCity(e.target.value)
                      }
                      className="w-full h-12"
                    />
                  </div>

                  {/* Submit Button (same size as before) */}
                  <div className="flex-none w-[90px] sm:w-[110px]">
                    <Button
                      type="submit"
                      className="w-full h-10 bg-blue-700 text-white flex items-center justify-center gap-2 whitespace-nowrap hover:bg-blue-600 hover:scale-105 transition-transform duration-200"
                    >
                      <Send className="h-5 w-5" />
                      <span className="hidden sm:inline">
                        {t("dashboard.submit")}
                      </span>
                    </Button>
                  </div>

                  {/* Detect Location Button (same size as before) */}
                  <div className="flex-none w-[90px] sm:w-[110px]">
                    <Button
                      type="button"
                      onClick={handleDetectLocation}
                      className="w-full h-10 bg-blue-700 text-white flex items-center justify-center gap-2 whitespace-nowrap hover:bg-blue-600 hover:scale-105 transition-transform duration-200"
                      aria-label={t("dashboard.detect") as string}
                    >
                      <MapPin className="h-5 w-5" />
                      <span className="hidden sm:inline">
                        {t("dashboard.detect")}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="w-full flex justify-center">
        <div className="w-full px-5">
          <CarouselWeather loading={loading} error={error} data={data} />
        </div>
      </div>

      {/* Graph Section */}
      <div className="w-full flex justify-center">
        <div className="w-full px-5">
          <Graphs
            loading={loading}
            error={error}
            data={data}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
