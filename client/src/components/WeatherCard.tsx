// // import React from "react";
// import { Volume2, Thermometer, ArrowDown, Wind, Droplet } from "lucide-react";
// import { useTranslation } from "react-i18next";

// interface CarouselCardProps {
//   idx: number;
//   dayData: any;
//   advisory: string;
//   formatDate: (dateStr: string) => { day: string; newDate: string };
//   speakText: (text: string, lang?: string) => void;
// }

// const WeatherCard: React.FC<CarouselCardProps> = ({
//   idx,
//   dayData,
//   advisory,
//   formatDate,
//   speakText,
// }) => {
//   const { t } = useTranslation();
//   const { day, newDate } = formatDate(dayData.date);

//   return (
//     <div
//       key={idx}
//       className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm rounded-3xl bg-gradient-to-br from-white/60 to-sky-50/60 border border-white/30 backdrop-blur-sm shadow-2xl p-4 sm:p-6 flex flex-col gap-4 transform transition hover:-translate-y-1 hover:scale-[1.02]"
//     >
//       {/* Decorative top strip */}
//       <div className="-mx-4 sm:-mx-6 mb-2 rounded-t-3xl overflow-hidden">
//         <div className="h-2 bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500/80"></div>
//       </div>

//       {/* Date */}
//       <div className="text-center">
//         <p className="text-sm sm:text-base font-semibold text-slate-800">
//           {newDate}
//         </p>
//         <p className="text-xs sm:text-sm text-slate-500">{day}</p>
//       </div>

//       {/* Weather Info */}
//       <div className="flex flex-col items-center gap-2">
//         <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-white/60 border border-white/40 shadow-inner">
//           <img
//             src={dayData.day.condition.icon}
//             alt={dayData.day.condition.text}
//             className="w-10 h-10 sm:w-12 sm:h-12"
//           />
//         </div>
//         <p className="text-2xl sm:text-3xl font-extrabold leading-none text-sky-700">
//           {dayData.day.avgtemp_c}°C
//         </p>
//         <p className="text-xs sm:text-sm text-slate-600 italic">
//           {dayData.day.condition.text}
//         </p>
//       </div>

//       {/* Divider */}
//       <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

//       {/* Extra Details */}
//       <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-slate-700">
//         <div className="bg-white/40 p-2 sm:p-3 rounded-xl flex flex-col items-center gap-1 sm:gap-2 border border-white/30">
//           <div className="flex items-center gap-1 sm:gap-2 text-sky-700">
//             <Thermometer className="w-4 h-4" />
//             <p className="font-medium text-xs">{t("card.max_temp")}</p>
//           </div>
//           <p className="text-sm font-semibold">{dayData.day.maxtemp_c}°C</p>
//         </div>

//         <div className="bg-white/40 p-2 sm:p-3 rounded-xl flex flex-col items-center gap-1 sm:gap-2 border border-white/30">
//           <div className="flex items-center gap-1 sm:gap-2 text-sky-700">
//             <ArrowDown className="w-4 h-4" />
//             <p className="font-medium text-xs">{t("card.min_temp")}</p>
//           </div>
//           <p className="text-sm font-semibold">{dayData.day.mintemp_c}°C</p>
//         </div>

//         <div className="bg-white/40 p-2 sm:p-3 rounded-xl flex flex-col items-center gap-1 sm:gap-2 border border-white/30">
//           <div className="flex items-center gap-1 sm:gap-2 text-sky-700">
//             <Wind className="w-4 h-4" />
//             <p className="font-medium text-xs">{t("card.wind")}</p>
//           </div>
//           <p className="text-sm font-semibold">{dayData.day.maxwind_kph} km/h</p>
//         </div>

//         <div className="bg-white/40 p-2 sm:p-3 rounded-xl flex flex-col items-center gap-1 sm:gap-2 border border-white/30">
//           <div className="flex items-center gap-1 sm:gap-2 text-sky-700">
//             <Droplet className="w-4 h-4" />
//             <p className="font-medium text-xs">{t("card.humidity")}</p>
//           </div>
//           <p className="text-sm font-semibold">{dayData.day.avghumidity}%</p>
//         </div>
//       </div>

//       {/* Advisory Section */}
//       <div className="mt-3 p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-emerald-50/60 via-emerald-100/50 to-white/60 border border-emerald-200/40 shadow-inner">
//         <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-medium line-clamp-4">
//           {advisory}
//         </p>

//         <div className="mt-2 sm:mt-3 flex justify-center">
//           <button
//             onClick={() => speakText(advisory, "hi-IN")}
//             className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/95 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold rounded-full shadow-sm hover:scale-105 transition ring-1 ring-emerald-100/60"
//             aria-label={t("carousel.listen") as string}
//           >
//             <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
//             {t("carousel.listen")}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeatherCard;
