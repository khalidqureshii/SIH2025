// import React, {useState, useEffect  } from "react";
// import InputField from "../components/InputField";
// import Button from "../components/Button";
// import WeatherDashboard from "../components/WeatherDashboard";
// import Loader from "@/components/Loader";
// import { useTranslation } from "react-i18next";

// const Weather: React.FC = () => {

//     const { t } = useTranslation();

//     const[city, setCity] = useState("");
//     const[citySubmitted, setCitySubmitted] = useState<string | null>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if ("geolocation" in navigator) {
//             navigator.geolocation.getCurrentPosition(
//                 async (position) => {
//                     const { latitude, longitude } = position.coords;
//                     try {
//                         // const res = await fetch(
//                         // `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//                         // );
//                         const res = await fetch(
//                         `https://us1.locationiq.com/v1/reverse?key=${import.meta.env.VITE_LOCATIONIQ_ACCESS_TOKEN}&lat=${latitude}&lon=${longitude}&format=json&`
//                         );
//                         const data = await res.json();
//                         const detectedCity = data.address.city || data.address.town || data.address.village || "";

//                         if (detectedCity) {
//                             setCity(detectedCity);
//                             setCitySubmitted(detectedCity);
//                         } else {
//                             console.warn("No city found for detected coordinates.");
//                         }
//                     } catch (err) {
//                         console.error("Reverse geocoding failed:", err);
//                     } finally {
//                         setLoading(false);
//                     }
//                 },
//                 (err) => {
//                     console.error("Geolocation error:", err);
//                     setLoading(false);
//                 }
//             );
//         } else {
//             console.error("Geolocation is not supported by your browser.");
//             setLoading(false);
//         }
//     }, []);

//     const handleSubmit = (e:React.FormEvent) => {
//         e.preventDefault();
//         if(!city.trim()) return;
//         setCitySubmitted(city);
//         console.log(city);
//     }

//       if (loading) {
//     return (
//       <Loader
//         src="https://lottie.host/28849d46-6262-42ec-be27-deea2d9ae9a0/ZgKbMCHk1g.lottie"
//         message={t("weather.loader_message")}
//         className="h-screen w-screen"
//         animationClassName="w-96 md:w-[28rem]"
//       />
//     );
//   }

//     return (
//      <>
//         {
//             (!citySubmitted) ? (
//             <div className="flex justify-center items-center mx-auto px-4 min-h-screen w-full bg-[url('./images/seasons_comp.jpg')] bg-cover bg-no-repeat bg-center">
//                 <form
//                     onSubmit={handleSubmit}
//                     className="flex flex-col items-center p-6 rounded-2xl shadow-md w-72 sm:w-80 md:w-96 lg:w-[28rem] min-h-80 sm:min-h-96 md:h-[26rem] lg:h-[30rem] bg-white/30 backdrop-blur"
//                 >
//                     <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-white [text-shadow:2px_2px_4px_#7f1d1d]">
//                         {t("weather.form_header")}
//                     </h1>
//                     <div className="flex-grow flex flex-col justify-center items-center gap-10 w-full">
//                         <InputField
//                             id="city"
//                             placeHolder={t("weather.placeholder")}
//                             value={city}
//                             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                                 setCity(e.target.value)
//                             }
//                         />
//                         <Button type="submit" name={t("weather.submit")} className="bg-emerald-600 hover:bg-green-500"/>
//                     </div>
//                 </form>
//             </div>
//         ) : (<WeatherDashboard city={city} cityChanged={setCity}/>)
//         }
//      </>
//     );
// }

// export default Weather;

import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import WeatherDashboard from "../components/WeatherDashboard";
import Loader from "@/components/Loader";
import { useTranslation } from "react-i18next";

const Weather: React.FC = () => {
  const { t } = useTranslation();

  const [city, setCity] = useState("");
  const [citySubmitted, setCitySubmitted] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // prevent state updates if component unmounts

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
      isMounted = false; // cleanup flag
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
            className="flex flex-col items-center p-6 rounded-2xl shadow-md w-72 sm:w-80 md:w-96 lg:w-[28rem] min-h-80 sm:min-h-96 md:h-[26rem] lg:h-[30rem] bg-white/30 backdrop-blur"
          >
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-white [text-shadow:2px_2px_4px_#7f1d1d]">
              {t("weather.form_header")}
            </h1>
            <div className="flex-grow flex flex-col justify-center items-center gap-10 w-full">
              <InputField
                id="city"
                placeHolder={t("weather.placeholder")}
                value={city}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCity(e.target.value)
                }
              />
              <Button
                type="submit"
                name={t("weather.submit")}
                className="bg-emerald-600 hover:bg-green-500"
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
