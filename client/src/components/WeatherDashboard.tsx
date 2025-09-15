// import React, { useEffect, useState } from "react";
// import InputField from "../components/InputField";
// import Label from "../components/Label";
// import Button from "../components/Button";
// import Card from "./Card";
// import Timeline from "./Timeline";
// import Graphs from "./Graphs";
// import PopOver from "./PopOver";
// import { useTranslation } from "react-i18next";

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
//     city: string;
//     cityChanged: (newCity: string) => void;
// }

// const WeatherDashboard: React.FC<WeatherDashboardProp> = (props) => {
//     const { t, i18n } = useTranslation();
//     const {city, cityChanged} = props;

//     const [newCity, setNewCity] = useState(city);
//     const [data, setData] = useState<WeatherApiResponse | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = (e:React.FormEvent) => {
//         e.preventDefault();
//         cityChanged(newCity);
//     }

//     useEffect(() => {
//         const fetchWeather = async () => {
//             if(!city) return;
//             setLoading(true);
//             setError(null);
//             try{
//                 // const response = await fetch(`http://localhost:3000/api/weather/advisory?q=${city}`);
//                 const response = await fetch(`http://localhost:5000/api/weather/advisory?q=${city}&lang=${i18n.language}`);
//                 if(!response.ok) throw new Error("Failed to fetch weather data");
//                 const result = await response.json();
//                 // console.log("API Response:", result);

//                 if (result && Array.isArray(result.forecast)) {
//                     const transformedForecast = result.forecast.map((day: any) => {
//                         const { hour, ...restOfDay } = day; 
//                         return restOfDay;
//                     });

//                     const transformedData = {
//                         ...result,
//                         forecast: transformedForecast,
//                     };
                    
//                     console.log("Transformed Data (no hour):", transformedData);
//                     setData(transformedData);
//                 }else {
//                     setData(result);
//                 }
//             }catch(err : any){
//                 setError(err.message);
//             }finally{
//                 setLoading(false);
//             }
//         };
//         fetchWeather();
//     }, [city, i18n.language]);

//     useEffect(() => {
//         if (data) {
//             console.log("Updated data:", data.forecast);
//         }
//     }, [data]);

//     const handleDetectLocation = () => {
//         if (!("geolocation" in navigator)) {
//             alert(t("dashboard.alerts.geolocation"));
//             return;
//         }

//         navigator.geolocation.getCurrentPosition(
//             async (position) => {
//             const { latitude, longitude } = position.coords;

//             try {
//                 const res = await fetch(
//                 `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//                 );
//                 const data = await res.json();
//                 const detectedCity =
//                 data.address.city || data.address.town || data.address.village || "";

//                 if (detectedCity) {
//                     setNewCity(detectedCity);
//                     cityChanged(detectedCity);
//                 } else {
//                     alert(t("dashboard.alerts.detect_failed1"));
//                 }
//             } catch (err) {
//                 console.error("Reverse geocoding failed:", err);
//                 alert(t("dashboard.alerts.detect_failed2"));
//             }
//             },
//             (error) => {
//                 console.error("Geolocation error:", error);
//                 alert(t("dashboard.alerts.detect_failed3"));
//             }
//         );
//     };

//     return (
//      <> 
//       <div className="w-full px-2 md:px-4">
//          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
//             <div className="flex flex-row justify-between items-center md:col-span-2 p-2 bg-indigo-50 rounded">
//                 <div className="flex items-center gap-4">
//                     <Label htmlFor="city-entry" labelName={t("dashboard.city")} />
//                     <InputField placeHolder={t("dashboard.placeholder")} id="city-entry" value={newCity} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCity(e.target.value)}/>
//                     <Button type="button" name={t("dashboard.detect")} className="bg-red-700 hover:bg-red-600" onClick={handleDetectLocation}/>
//                 </div>
//                 <div><Button type="submit" name={t("dashboard.submit")} onSubmit={handleSubmit} className="bg-emerald-600 hover:bg-green-500"/></div>
//             </div>
//             <div className="p-2 bg-yellow-50 rounded shadow">
//                 <Card loading={loading} error={error} data={data}/>
//             </div>
//             <div className="p-2 bg-red-50 rounded shadow">
//                 <Timeline loading={loading} error={error} forecast={data?.forecast || []}/>
//             </div>
//             <div className="md:col-span-2 p-2 bg-green-50 rounded">
//                 <Graphs data={data} loading={loading} error={error}/>
//             </div>
//             <div className="md:col-span-2 p-2 bg-sky-50 rounded">
//                 <PopOver data={data} loading={loading} error={error}/>
//             </div>
//          </form>
//       </div>
//      </>
//     );
// }

// export default WeatherDashboard;


import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import InputField from "../components/InputField";
import Label from "../components/Label";
import Button from "../components/Button";
import Card from "./Card";
import Timeline from "./Timeline";
import Graphs from "./Graphs";
import PopOver from "./PopOver";
import { useTranslation } from "react-i18next";
import LINK from "@/store/Link";

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

const WeatherDashboard: React.FC<WeatherDashboardProp> = ({ city, cityChanged }) => {
  const { t, i18n } = useTranslation();

  const [newCity, setNewCity] = useState(city);
  const [data, setData] = useState<WeatherApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchWeather = async () => {
            if(!city) return;
            setLoading(true);
            setError(null);
            try{
                // const response = await fetch(`http://localhost:3000/api/weather/advisory?q=${city}`);
                const response = await fetch(`${LINK}/weather/advisory?q=${city}&lang=${i18n.language}`);
                if(!response.ok) throw new Error("Failed to fetch weather data");
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
        <div className="flex flex-row justify-between items-center md:col-span-2 p-2 bg-indigo-50 rounded">
          <div className="flex items-center gap-4">
            <Label htmlFor="city-entry" labelName={t("dashboard.city")} />
            <InputField
              placeHolder={t("dashboard.placeholder")}
              id="city-entry"
              value={newCity}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCity(e.target.value)}
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

        <div className="p-2 bg-yellow-50 rounded shadow">
          <Card loading={loading} error={error} data={data} />
        </div>
        <div className="p-2 bg-red-50 rounded shadow">
          <Timeline loading={loading} error={error} forecast={data?.forecast || []} />
        </div>
        <div className="md:col-span-2 p-2 bg-green-50 rounded">
          <Graphs data={data} loading={loading} error={error} />
        </div>
        <div className="md:col-span-2 p-2 bg-sky-50 rounded">
          <PopOver data={data} loading={loading} error={error} />
        </div>
      </form>
    </div>
  );
};

export default WeatherDashboard;