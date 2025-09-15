// import { useNavigate } from "react-router-dom";
// import { LogOut, Sprout } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import LanguageSelector from "@/components/LanguageSelector";
// import { logoutUser } from "@/store/features/authSlice";
// import { useDispatch } from "react-redux";
// import type { AppDispatch } from "@/store/Store";

// function Navbar() {
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   const dispatch = useDispatch<AppDispatch>();
//   const handleLogOut = () => {
//     dispatch(logoutUser());
//     navigate("/auth");
//   };

//   return (
//     <header
//       className="flex flex-row justify-between items-center px-6 py-4 
//                  bg-white/30 backdrop-blur-md border-b border-white/40 
//                  shadow-md sticky top-0 z-50"
//     >
//       <button
//         onClick={() => navigate("/")}
//         className="flex items-center gap-2 text-green-800 hover:opacity-80 transition"
//       >
//         <Sprout className="w-7 h-7" />
//         <h1 className="text-xl md:text-2xl font-bold tracking-wide">
//           {t("navbar.title")}
//         </h1>
//       </button>

//       <div className="flex items-center gap-3">
//         <LanguageSelector />
//         <button
//           onClick={handleLogOut}
//           className="flex items-center gap-2 bg-white/60 backdrop-blur-md 
//                      text-green-700 font-medium px-4 py-2 rounded-lg shadow 
//                      hover:bg-white/80 transition w-40 justify-center"
//         >
//           <LogOut className="w-5 h-5" />
//           <span className="text-sm font-medium">{t("navbar.logout_label")}</span>
//         </button>
//       </div>
//     </header>
//   );
// }

// export default Navbar;


import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/LanguageSelector";
import { logoutUser } from "@/store/features/authSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/Store";

function Navbar() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();
  const handleLogOut = () => {
    dispatch(logoutUser());
    navigate("/auth");
  };

  return (
    // <header
    //   className="flex justify-between items-center 
    //              px-6 py-4 bg-white/30 backdrop-blur-md border-b border-white/40 
    //              shadow-md sticky top-0 z-50"
    // >
    <header
      className="flex justify-between items-center 
                 px-6 py-4 bg-white border-b border-white/40 
                 shadow-md sticky top-0 z-50"
    >
      {/* Logo + Title */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-green-800 hover:opacity-80 transition
                   ltr:order-1 rtl:order-2"
      >
        <img src="plant.png" className="w-7 h-7 rtl:ml-2 rtl:order-1" />
        <h1 className="text-xl md:text-2xl font-bold tracking-wide rtl:order-1">
          {t("navbar.title")}
        </h1>
      </button>

      {/* Controls (Language + Logout) */}
      <div
        className="flex items-center gap-3 ltr:order-2 rtl:order-1"
      >
        {/* Language first in LTR, second in RTL */}
        <div className="ltr:order-1 rtl:order-2">
          <LanguageSelector />
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogOut}
          className="flex items-center gap-2 bg-white/60 backdrop-blur-md 
                     text-green-700 font-medium px-4 py-2 rounded-lg shadow 
                     hover:bg-white/80 transition w-40 justify-center
                     ltr:order-2 rtl:order-1"
        >
          {/* Flip logout icon in RTL */}
          <LogOut className="w-5 h-5 rtl:rotate-180" />
          <span className="text-sm font-medium">{t("navbar.logout_label")}</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;

