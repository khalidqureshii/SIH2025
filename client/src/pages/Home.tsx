// import { useState} from "react";
// import Loader from "../components/Loader";
// import { useSelector } from "react-redux";
// import { UserType } from "@/store/Types";

// function Home() {
//     const user= useSelector((state:any)=>state.auth.user); 
//     console.log(user);
//     const displayName:string = `, ${user.username}`;
//     const userID:any = user._id;
//     const [isLoading, setLoading] = useState(false);

//     if (isLoading) return <Loader />;

//     return <div className="mx-5"><div className="flex flex-col justify-center items-center w-full h-90vh">
//                 <h1 className="mb-5 text-4xl md:text-5xl text-center">Welcome{displayName}</h1>
//             </div></div>
// }   

// export default Home;


import { CloudSun, Leaf, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen relative flex flex-col items-center p-6 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center w-full">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          {t("home.header_title")}
        </h1>
        <p className="text-gray-700 mb-6">
          {t("home.subheader")}
        </p>

        <div
          className="rounded-xl shadow-md p-4 w-full max-w-md mb-6 
                bg-white/30 backdrop-blur-md border border-white/40"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md">
          <div className=" rounded-xl shadow-md p-4 flex flex-col backdrop-blur-md items-center hover:shadow-xl transition cursor-pointer"
          onClick={() => navigate("/soil")}>
           <Leaf className="text-green-600 w-10 h-10 mb-2" />
            <p className="text-sm font-medium text-gray-800">
              {t("home.shortcut_labels.soil")}
            </p>
          </div>
          <div className=" rounded-xl shadow-md p-4 flex flex-col backdrop-blur-md items-center hover:shadow-xl transition cursor-pointer"
          onClick={() => navigate("/weather")}>
             <CloudSun className="text-yellow-500 w-10 h-10 mb-2" />
            <p className="text-sm font-medium text-gray-800">
              {t("home.shortcut_labels.weather")}
            </p>
          </div>
          <div
            className=" rounded-xl shadow-md p-4 flex flex-col backdrop-blur-md items-center hover:shadow-xl transition cursor-pointer"
            onClick={() => navigate("/disease")}
          >
            <ShieldAlert className="text-red-500 w-10 h-10 mb-2" />
            <p className="text-sm font-medium text-gray-800">
              {t("home.shortcut_labels.disease")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;