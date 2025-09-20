// import { CloudSun, Leaf, ShieldAlert } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";  

// const Home = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   return (
//     <div className="min-h-screen relative flex flex-col items-center p-6 overflow-hidden">
//       <div className="relative z-10 flex flex-col items-center w-full">
//         <h1 className="text-3xl font-bold text-green-800 mb-2">
//           {t("home.header_title")}
//         </h1>
//         <p className="text-gray-700 mb-6">
//           {t("home.subheader")}
//         </p>

//         <div
//           className="rounded-xl shadow-md p-4 w-full max-w-md mb-6
//                 bg-white/30 backdrop-blur-md border border-white/40"
//         >
//           <h2 className="text-lg font-semibold text-gray-800 mb-3">
//             {t("home.location_title")}
//           </h2>
//           <div className="flex flex-col gap-3">
//             <button className="bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 transition">
//               {t("home.allow_gps")}
//             </button>
//             <button className="border border-green-600 text-green-700 py-2 rounded-lg shadow hover:bg-green-50 transition">
//               {t("home.manual_button")}
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md">
//           <div className=" rounded-xl shadow-md p-4 flex flex-col backdrop-blur-md items-center hover:shadow-xl transition cursor-pointer"
//           onClick={() => navigate("/soil")}>
//            <Leaf className="text-green-600 w-10 h-10 mb-2" />
//             <p className="text-sm font-medium text-gray-800">
//               {t("home.shortcut_labels.soil")}
//             </p>
//           </div>
//           <div className=" rounded-xl shadow-md p-4 flex flex-col backdrop-blur-md items-center hover:shadow-xl transition cursor-pointer"
//           onClick={() => navigate("/weather")}>
//              <CloudSun className="text-yellow-500 w-10 h-10 mb-2" />
//             <p className="text-sm font-medium text-gray-800">
//               {t("home.shortcut_labels.weather")}
//             </p>
//           </div>
//           <div
//             className=" rounded-xl shadow-md p-4 flex flex-col backdrop-blur-md items-center hover:shadow-xl transition cursor-pointer"
//             onClick={() => navigate("/disease")}
//           >
//             <ShieldAlert className="text-red-500 w-10 h-10 mb-2" />
//             <p className="text-sm font-medium text-gray-800">
//               {t("home.shortcut_labels.disease")}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import { CloudSun, Leaf, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen relative flex flex-col items-center p-6 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center w-full mt-8">
        <h1 className="text-5xl font-bold text-green-800 mb-2 text-center">
          {/* {t("home.header_title")} */}
          Bhoomiबंधु
        </h1>
        <p className="text-gray-700 text-xl mb-6 text-center">
          {t("home.subheader")}
        </p>

        {/* <div
          className="rounded-xl shadow-md p-4 w-full max-w-md mb-6 
                       bg-white/30 backdrop-blur-md border border-white/40"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center sm:text-start">
            {t("home.location_title")}
          </h2>
          <div className="flex flex-col gap-3">
            <button className="bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 transition">
              {t("home.allow_gps")}
            </button>
            
            <button className="border border-green-600 text-green-700 py-2 rounded-lg shadow hover:bg-green-50 transition">
              {t("home.manual_button")}
            </button>
          </div>
        </div> */}

        <div
          dir="ltr"
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl mt-6"
        >
          {/* Soil Advisory Card */}
          <div
            onClick={() => navigate("/soil")}
            className="rounded-xl shadow-lg bg-white/70 backdrop-blur-md 
               flex flex-col overflow-hidden hover:shadow-2xl hover:scale-[1.02] 
               transition cursor-pointer"
          >
            {/* Image with margin inside */}
            <div>
              <img
                src="/images/crop-advisory.jpg"
                alt="Soil Advisory"
                className="w-full h-36 object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 px-4 py-4">
              <h3 className="text-lg font-bold text-green-700 mb-2">
                {t("home.shortcut_labels.crop")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("home.descriptions.crop") ||
                  "Get soil health insights and best practices for crop productivity."}
              </p>
            </div>
          </div>

          {/* Weather Card */}
          <div
            onClick={() => navigate("/weather")}
            className="rounded-xl shadow-lg bg-white/70 backdrop-blur-md 
               flex flex-col overflow-hidden hover:shadow-2xl hover:scale-[1.02] 
               transition cursor-pointer"
          >
            <div>
              <img
                src="/images/weather.jpg"
                alt="Weather"
                className="w-full h-36 object-cover"
              />
            </div>
            <div className="flex flex-col flex-1 px-4 py-4">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                {t("home.shortcut_labels.weather")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("home.descriptions.weather") ||
                  "Check weather forecasts and plan farming activities accordingly."}
              </p>
            </div>
          </div>

          {/* Disease Detection Card */}
          <div
            onClick={() => navigate("/disease")}
            className="rounded-xl shadow-lg bg-white/70 backdrop-blur-md 
               flex flex-col overflow-hidden hover:shadow-2xl hover:scale-[1.02] 
               transition cursor-pointer"
          >
            <div>
              <img
                src="/images/disease.jpg"
                alt="Disease Detection"
                className="w-full h-36 object-cover"
              />
            </div>
            <div className="flex flex-col flex-1 px-4 py-4">
              <h3 className="text-lg font-bold text-orange-600 mb-2">
                {t("home.shortcut_labels.disease")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("home.descriptions.disease") ||
                  "Detect crop diseases early and take preventive measures."}
              </p>
            </div>
          </div>

          <div
            onClick={() => navigate("/market")}
            className="rounded-xl shadow-lg bg-white/70 backdrop-blur-md 
               flex flex-col overflow-hidden hover:shadow-2xl hover:scale-[1.02] 
               transition cursor-pointer"
          >
            <div>
              <img
                src="/images/market.jpg"
                alt="Market Price"
                className="w-full h-36 object-cover"
              />
            </div>
            <div className="flex flex-col flex-1 px-4 py-4">
              <h3 className="text-lg font-bold text-orange-600 mb-2">
                {t("home.shortcut_labels.market")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("home.descriptions.market")}
              </p>
            </div>
          </div>
        </div>

        {/* <div
          dir="ltr"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md"
        >
          <div
           
            className="rounded-xl shadow-md p-4 flex flex-col items-center backdrop-blur-md hover:shadow-xl transition cursor-pointer"
              onClick={() => navigate("/soil")}
          
          >
             <Leaf className="text-green-600 w-10 h-10 mb-2" />
            <p className="text-sm font-medium text-gray-800 text-center">
              {t("home.shortcut_labels.soil")}
            </p>
          </div>
          <div
            className=" rounded-xl shadow-md p-4 flex flex-col backdrop-blur-md items-center hover:shadow-xl transition cursor-pointer"
            onClick={() => navigate("/weather")}
          >
            <CloudSun className="text-yellow-500 w-10 h-10 mb-2" />
            <p className="text-sm font-medium text-gray-800">
              {t("home.shortcut_labels.weather")}
            </p>
          </div>
          <div
            className="rounded-xl shadow-md p-4 flex flex-col items-center backdrop-blur-md hover:shadow-xl transition cursor-pointer"
            onClick={() => navigate("/disease")}
          >
            <ShieldAlert className="text-red-500 w-10 h-10 mb-2" />
            <p className="text-sm text-center font-medium text-gray-800">
              {t("home.shortcut_labels.disease")}
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
