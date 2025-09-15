import { Menu } from "@headlessui/react";
import { Globe, ChevronDownIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "as", displayLabel: "Assamese (অসমীয়া)", englishLabel: "Assamese" },
  { code: "bn", displayLabel: "Bengali (বাংলা)", englishLabel: "Bengali" },
  { code: "brx", displayLabel: "Bodo (बड़ो)", englishLabel: "Bodo" },
  { code: "doi", displayLabel: "Dogri (डोगरी)", englishLabel: "Dogri" },
  { code: "en", displayLabel: "English", englishLabel: "English" },
  { code: "gu", displayLabel: "Gujarati (ગુજરાતી)", englishLabel: "Gujarati" },
  { code: "hi", displayLabel: "Hindi (हिन्दी)", englishLabel: "Hindi" },
  { code: "kn", displayLabel: "Kannada (ಕನ್ನಡ)", englishLabel: "Kannada" },
  { code: "ks", displayLabel: "Kashmiri (كشميري)", englishLabel: "Kashmiri" },
  { code: "kok", displayLabel: "Konkani (कोंकणी)", englishLabel: "Konkani" },
  { code: "mai", displayLabel: "Maithili (मैथिली)", englishLabel: "Maithili" },
  { code: "ml", displayLabel: "Malayalam (മലയാളം)", englishLabel: "Malayalam" },
  { code: "mr", displayLabel: "Marathi (मराठी)", englishLabel: "Marathi" },
  { code: "ne", displayLabel: "Nepali (नेपाली)", englishLabel: "Nepali" },
  { code: "or", displayLabel: "Odia (ଓଡ଼ିଆ)", englishLabel: "Odia" },
  { code: "pa", displayLabel: "Punjabi (ਪੰਜਾਬੀ)", englishLabel: "Punjabi" },
  {
    code: "sa",
    displayLabel: "Sanskrit (संस्कृतम्)",
    englishLabel: "Sanskrit",
  },
  { code: "sd", displayLabel: "Sindhi (سنڌي)", englishLabel: "Sindhi" },
  { code: "ta", displayLabel: "Tamil (தமிழ்)", englishLabel: "Tamil" },
  { code: "te", displayLabel: "Telugu (తెలుగు)", englishLabel: "Telugu" },
  { code: "ur", displayLabel: "Urdu (اردو)", englishLabel: "Urdu" },
];

// function LanguageSelector() {
//   const { i18n } = useTranslation();

//   const handleLanguageChange = (lng: string) => {
//     i18n.changeLanguage(lng);
//     localStorage.setItem("language", lng);
//   };

//   const selectedLanguage = languages.find((l) => l.code === i18n.language);

//   return (
//     <Menu as="div" className="relative">
//       <Menu.Button
//         className="flex items-center gap-2 bg-white/60 backdrop-blur-md
//                    text-green-700 font-medium px-4 py-2 rounded-lg shadow
//                    hover:bg-white/80 transition w-52 justify-between
//                    focus:outline-none focus:ring-0"
//       >
//         <Globe className="w-5 h-5" />
//         <span className="text-sm font-medium">
//           {selectedLanguage?.englishLabel || "Language"}
//         </span>
//         <ChevronDownIcon className="w-5 h-5 text-gray-500" />
//       </Menu.Button>

//       <Menu.Items
//         className="absolute right-0 z-10 mt-2 w-52 origin-top-right
//                    rounded-md bg-white/90 backdrop-blur-md shadow-lg
//                    focus:outline-none max-h-[20rem] overflow-y-auto scroll-smooth
//                    scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-gray-100"
//       >
//         <div className="py-1">
//           {languages.map((lng) => (
//             <Menu.Item key={lng.code}>
//               {({ active }) => (
//                 <button
//                   onClick={() => handleLanguageChange(lng.code)}
//                   className={`${
//                     active ? "bg-green-100" : ""
//                   } block w-full text-left px-4 py-2 text-sm text-green-700 transition-colors duration-200`}
//                 >
//                   {lng.displayLabel}
//                 </button>
//               )}
//             </Menu.Item>
//           ))}
//         </div>
//       </Menu.Items>
//     </Menu>
//   );
// }

function LanguageSelector({ fullWidth = false }: { fullWidth?: boolean }) {
  const { i18n } = useTranslation();
  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  const selectedLanguage = languages.find((l) => l.code === i18n.language);

  return (
    <Menu as="div" className="relative w-full">
      <Menu.Button
        className={`flex items-center gap-2 bg-white/60 backdrop-blur-md 
                    text-green-700 font-medium px-4 py-2 rounded-lg shadow 
                    hover:bg-white/80 transition justify-between
                    focus:outline-none focus:ring-0
                    ${fullWidth ? "w-full" : "w-52"}`}
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium">
          {selectedLanguage?.englishLabel || "Language"}
        </span>
        <ChevronDownIcon className="w-5 h-5 text-gray-500" />
      </Menu.Button>

      <Menu.Items
        className="absolute right-0 z-10 mt-2 w-full origin-top-right 
                   rounded-md bg-white/90 backdrop-blur-md shadow-lg
                   focus:outline-none max-h-[20rem] overflow-y-auto scroll-smooth
                   scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-gray-100"
      >
        <div className="py-1">
          {languages.map((lng) => (
            <Menu.Item key={lng.code}>
              {({ active }) => (
                <button
                  onClick={() => handleLanguageChange(lng.code)}
                  className={`${
                    active ? "bg-green-100" : ""
                  } block w-full text-left px-4 py-2 text-sm text-green-700 transition-colors duration-200`}
                >
                  {lng.displayLabel}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
}

export default LanguageSelector;
