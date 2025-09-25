// import { LINK } from "@/store/Link";
import { useState, useEffect } from "react";
import { FaLeaf, FaSeedling, FaWater, FaLayerGroup } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { LINK } from "@/store/Link";

// --- INTERFACES ---
interface Scheme {
  beneficiaryState: string[];
  beneficiaryStateName?: string;
  schemeShortTitle: string;
  level: string;
  schemeFor: string;
  nodalMinistryName: string;
  schemeCategory: string[];
  schemeName: string;
  briefDescription: string;
  tags: string[];
  slug: string;
  deadline?: string; // Added deadline field
}

// --- STATES ---
// Keys for translations
const stateKeys: string[] = [
  "scheme.states.all",
  "scheme.states.andhraPradesh",
  "scheme.states.maharashtra",
  "scheme.states.karnataka",
  "scheme.states.tamilNadu",
];

// Map keys → backend API values
const stateApiMap: Record<string, string> = {
  "scheme.states.all": "All",
  "scheme.states.andhraPradesh": "Andhra Pradesh",
  "scheme.states.maharashtra": "Maharashtra",
  "scheme.states.karnataka": "Karnataka",
  "scheme.states.tamilNadu": "Tamil Nadu",
};

// Map categories to icons
const categoryIcons: Record<string, JSX.Element> = {
  Agriculture: <FaLeaf />,
  Horticulture: <FaSeedling />,
  Water: <FaWater />,
};

// --- HELPER FUNCTION ---
const formatDeadline = (deadline: string) => {
  const date = new Date(deadline);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// --- MAIN COMPONENT ---
export default function Scheme() {
  const [selectedState, setSelectedState] = useState<string>("states.all");
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const getDaysLeft = (deadline: string) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = Math.ceil(
      (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff > 0 ? `${diff} ${t("scheme.days_left")}` : t("scheme.deadline");
  };

  useEffect(() => {
    const fetchSchemes = async (stateKey: string) => {
      setLoading(true);
      try {
        const apiValue = stateApiMap[stateKey] || "All";

        const res = await fetch(
          // `http://localhost:3000/api/scheme/getScheme?state=${apiValue}&language=${lang}`
          `${LINK}/api/scheme/getScheme?state=${apiValue}&language=${lang}`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();
        console.log(json);
        const schemesData: Scheme[] = json.schemes.map((item: any) => item);
        setSchemes(schemesData);
      } catch (error) {
        console.error(error);
        setSchemes([]);
      }
      setLoading(false);
    };

    fetchSchemes(selectedState);
  }, [selectedState]);

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "central":
        return "bg-green-100 text-green-800 border-green-200";
      case "state":
        return "bg-lime-100 text-lime-800 border-lime-200";
      default:
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden relative"
      // style={{
      //   backgroundImage: "url('/images/soil-advisory.jpg')",
      // }}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div> */}

      {/* Content */}
      <div className="relative container mx-auto px-4 md:px-6 py-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-lime-500 text-white rounded-3xl shadow-lg p-8 md:p-10 mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            {t("scheme.title.government")}{" "}
            <span className="text-yellow-300">{t("scheme.title.scheme")}</span>
          </h1>
          <p className="text-base md:text-xl max-w-2xl mx-auto mb-6 drop-shadow-md">
            {t("scheme.description")}
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <span className="bg-white text-green-700 px-4 py-2 rounded-full font-semibold shadow text-sm md:text-base">
              {t("scheme.pan_india")}
            </span>
            <span className="bg-white text-green-700 px-4 py-2 rounded-full font-semibold shadow text-sm md:text-base">
              {t("scheme.daily_update")}
            </span>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-12 border border-gray-100 flex flex-col md:flex-row justify-between items-stretch gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-green-500 via-lime-500 to-emerald-500 rounded-xl">
              <FaLayerGroup className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {t("scheme.filters.title")}
              </h2>
              <p className="text-gray-500 text-sm md:text-base">
                {t("scheme.filters.description")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-2xl w-full md:w-auto">
            <label className="text-gray-700 font-semibold whitespace-nowrap px-2">
              {t("scheme.filters.label")}
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-4 py-2 bg-white rounded-xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-green-100 focus:border-green-400 focus:outline-none transition-all duration-200 font-medium text-gray-700"
            >
              {stateKeys.map((key) => (
                <option key={key} value={key}>
                  {t(key)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Schemes List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">
                {t("scheme.list.loading")}
              </h3>
              <p className="text-white">{t("scheme.list.fetching")}</p>
            </div>
          </div>
        ) : schemes.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaLayerGroup className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t("scheme.list.no_schemes")}
              </h3>
              <p className="text-gray-500 mb-6">
                {t("scheme.list.no_scheme_msg")}{" "}
                <strong>{t(selectedState)}</strong>.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schemes.map((scheme) => (
              <div
                key={scheme.slug}
                className="flex flex-col bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 p-6"
              >
                {/* Icon + Level */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-100 rounded-2xl text-green-700 text-2xl">
                    {scheme.schemeCategory &&
                    scheme.schemeCategory.length > 0 ? (
                      categoryIcons[scheme.schemeCategory[0]] || (
                        <FaLayerGroup />
                      )
                    ) : (
                      <FaLayerGroup />
                    )}
                  </div>
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getLevelColor(
                      scheme.level
                    )}`}
                  >
                    {scheme.level}
                  </div>
                </div>

                {/* Title + Description */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {scheme.schemeName}
                </h2>
                <p className="text-gray-700 mb-3">{scheme.briefDescription}</p>

                {/* Deadline */}
                {scheme.deadline && (
                  <div className="mb-3">
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold border border-red-200">
                      {t("scheme.list.deadline")}{" "}
                      {formatDeadline(scheme.deadline)} (
                      {getDaysLeft(scheme.deadline)})
                    </span>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {scheme.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded-xl text-sm font-medium transition-colors duration-300 hover:bg-green-200 cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Info Row */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-700 mt-auto">
                  <p>
                    <strong>{t("scheme.list.info_row.scheme_for")}</strong>{" "}
                    {scheme.schemeFor}
                  </p>
                  <p>
                    <strong>{t("scheme.list.info_row.nodal_ministry")}</strong>{" "}
                    {scheme.nodalMinistryName}
                  </p>
                  <p>
                    <strong>
                      {t("scheme.list.info_row.beneficiary_states")}
                    </strong>{" "}
                    {scheme.beneficiaryState.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
