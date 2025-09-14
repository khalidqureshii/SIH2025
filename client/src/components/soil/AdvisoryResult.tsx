import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const COLORS = ["#22c55e", "#3b82f6", "#facc15"]; // green, blue, yellow
const icons = ["🌱", "💧", "🧪", "☔", "⚠️", "✅"]

interface AdvisoryResultProps {
  result?: {
    weather: {
      temperature: number;
      humidity: number;
      rainfall: number;
      season: string;
    };
    satellite: {
      ndvi: number;
      ndwi: number;
      soilMoisture: number;
      ph: number;
    };
    nutrients: {
      n: number;
      p: number;
      k: number;
      confidence: number;
    };
    recommendations: {
      confidence: number;
      crops: {
        [key: string]: {
          Confidence: number;
          "Expected Yield": string;
          Suitability: string;
          "Seasonal Match": string;
          "Overall Score": number;
        };
      };
    };
    advanced_insights: string[];
  };
}

export function AdvisoryResult({ result }: AdvisoryResultProps) {
  const { t } = useTranslation();
  if (!result) {
    return (
      <div className="mt-6 text-center text-gray-500">
        {t("advisory_result.no_results")}
      </div>
    );
  }

  

    const nutrientData = [
    { name: t("advisory_result.nutrients.labels.nitrogen"), value: result.nutrients.n },
    { name: t("advisory_result.nutrients.labels.phosphorus"), value: result.nutrients.p },
    { name: t("advisory_result.nutrients.labels.potassium"), value: result.nutrients.k },
  ];

  const [openCrop, setOpenCrop] = useState<string | null>(null);

  return (
    <div className="mt-6 w-full max-w-3xl p-4 rounded-lg shadow bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-4">{t("advisory_result.report_title")}</h2>

      <Tabs defaultValue="weather" className="w-full">
        <TabsList className="flex justify-between bg-gray-50 w-full mb-6">
          <TabsTrigger value="weather"
          className="relative text-sm px-4 py-2 text-gray-600 
             data-[state=active]:bg-transparent 
             data-[state=active]:shadow-none 
             data-[state=active]:ring-0 
             data-[state=active]:border-none 
             data-[state=active]:text-green-700 
             after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] 
             after:bg-green-600 after:scale-x-0 
             data-[state=active]:after:scale-x-100 
             after:transition-transform after:duration-300 ">{t("advisory_result.tabs.weather")}</TabsTrigger>
          <TabsTrigger value="satellite"
          className="relative text-sm px-4 py-2 text-gray-600 
             data-[state=active]:bg-transparent 
             data-[state=active]:shadow-none 
             data-[state=active]:ring-0 
             data-[state=active]:border-none 
             data-[state=active]:text-green-700 
             after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] 
             after:bg-green-600 after:scale-x-0 
             data-[state=active]:after:scale-x-100 
             after:transition-transform after:duration-300">{t("advisory_result.tabs.satellite")}</TabsTrigger>
          <TabsTrigger value="nutrients"
          className="relative text-sm px-4 py-2 text-gray-600 
             data-[state=active]:bg-transparent 
             data-[state=active]:shadow-none 
             data-[state=active]:ring-0 
             data-[state=active]:border-none 
             data-[state=active]:text-green-700 
             after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] 
             after:bg-green-600 after:scale-x-0 
             data-[state=active]:after:scale-x-100 
             after:transition-transform after:duration-300">{t("advisory_result.tabs.nutrients")}</TabsTrigger>
          <TabsTrigger value="recommendations"
          className="relative text-sm px-4 py-2 text-gray-600 
             data-[state=active]:bg-transparent 
             data-[state=active]:shadow-none 
             data-[state=active]:ring-0 
             data-[state=active]:border-none 
             data-[state=active]:text-green-700 
             after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] 
             after:bg-green-600 after:scale-x-0 
             data-[state=active]:after:scale-x-100 
             after:transition-transform after:duration-300">{t("advisory_result.tabs.recommendations")}</TabsTrigger>
            <TabsTrigger value="ai_insights"
              className="relative text-sm px-4 py-2 text-gray-600 
                data-[state=active]:bg-transparent 
                data-[state=active]:shadow-none 
                data-[state=active]:ring-0 
                data-[state=active]:border-none 
                data-[state=active]:text-green-700 
                after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] 
                after:bg-green-600 after:scale-x-0 
                data-[state=active]:after:scale-x-100 
                after:transition-transform after:duration-300 ">{t("advisory_result.tabs.ai_insights")}</TabsTrigger>
        </TabsList>

       <TabsContent value="weather" className="grid grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100 hover:shadow-lg transition">
            {/* <p className="text-sm font-medium text-gray-500">Temperature🌡️</p> */}
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">{t("advisory_result.weather.temperature.button")}</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-60 bg-gray-100 shadow-lg rounded-xl">
                <div className="flex justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{t("advisory_result.weather.temperature.title")}</h4>
                    <p className="text-sm text-gray-600">
                      {t("advisory_result.weather.temperature.description")}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <p className="text-2xl font-bold text-green-700 mt-2">
              {result.weather.temperature.toFixed(2)}°C
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100 hover:shadow-lg transition">
            {/* <p className="text-sm font-medium text-gray-500">Humidity💧</p> */}
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">{t("advisory_result.weather.humidity.button")}</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-60 bg-gray-100 shadow-lg rounded-xl">
                <div className="flex justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{t("advisory_result.weather.humidity.title")}</h4>
                    <p className="text-sm text-gray-600">
                      {t("advisory_result.weather.humidity.description")}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <p className="text-2xl font-bold text-green-700 mt-2">
              {result.weather.humidity.toFixed(2)}%
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100 hover:shadow-lg transition">
            {/* <p className="text-sm font-medium text-gray-500">Rainfall🌦️</p> */}
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">{t("advisory_result.weather.rainfall.button")}</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-60 bg-gray-100 shadow-lg rounded-xl">
                <div className="flex justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{t("advisory_result.weather.rainfall.title")}</h4>
                    <p className="text-sm text-gray-600">
                      {t("advisory_result.weather.rainfall.description")}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <p className="text-2xl font-bold text-green-700 mt-2">
              {result.weather.rainfall.toFixed(2)} {t("advisory_result.weather.rainfall.unit")}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100 hover:shadow-lg transition">
            {/* <p className="text-sm font-medium text-gray-500">Season🌱</p> */}
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">{t("advisory_result.weather.season.button")}</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-60 bg-gray-100 shadow-lg rounded-xl">
                <div className="flex justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{t("advisory_result.weather.season.title")}</h4>
                    <p className="text-sm text-gray-600">
                      {t("advisory_result.weather.season.description")}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <p className="text-2xl font-bold text-green-700 mt-2">
              {result.weather.season}
            </p>
          </div>
        </TabsContent>


        <TabsContent value="satellite" className="grid grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100 hover:shadow-lg transition">
            {/* <p className="text-sm font-medium text-gray-500">NDVI (Vegetation Health)</p> */}
             <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">{t("advisory_result.satellite.ndvi.button")}</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-60 bg-gray-100 shadow-lg rounded-xl">
                <div className="flex justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{t("advisory_result.satellite.ndvi.title")}</h4>
                    <p className="text-sm text-gray-600">
                      {t("advisory_result.satellite.ndvi.description")}
                    </p>
                  </div>
                </div>  
              </HoverCardContent>
            </HoverCard>
            <p className="text-2xl font-bold text-green-700 mt-2">
              {result.satellite.ndvi.toFixed(4)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100 hover:shadow-lg transition">
            {/* <p className="text-sm font-medium text-gray-500">NDWI (Water Index)</p> */}
             <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">{t("advisory_result.satellite.ndwi.button")}</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-60 bg-gray-100 shadow-lg rounded-xl">
                <div className="flex justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{t("advisory_result.satellite.ndwi.title")}</h4>
                    <p className="text-sm text-gray-600">
                      {t("advisory_result.satellite.ndwi.description")}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <p className="text-2xl font-bold text-green-700 mt-2">
              {result.satellite.ndwi.toFixed(4)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100 hover:shadow-lg transition">
            {/* <p className="text-sm font-medium text-gray-500">Soil Moisture</p> */}
             <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">{t("advisory_result.satellite.soil_moisture.button")}</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-60 bg-gray-100 shadow-lg rounded-xl">
                <div className="flex justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{t("advisory_result.satellite.soil_moisture.title")}</h4>
                    <p className="text-sm text-gray-600">
                      {t("advisory_result.satellite.soil_moisture.description")}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <p className="text-2xl font-bold text-green-700 mt-2">
              {result.satellite.soilMoisture.toFixed(4)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100 hover:shadow-lg transition">
            {/* <p className="text-sm font-medium text-gray-500">Soil pH</p> */}
             <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">{t("advisory_result.satellite.soil_ph.button")}</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-60 bg-gray-100 shadow-lg rounded-xl">
                <div className="flex justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{t("advisory_result.satellite.soil_ph.title")}</h4>
                    <p className="text-sm text-gray-600">
                      {t("advisory_result.satellite.soil_ph.description")}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <p className="text-2xl font-bold text-green-700 mt-2">
              {result.satellite.ph.toFixed(4)}
            </p>
          </div>

        </TabsContent>


      <TabsContent value="nutrients" className="flex flex-col items-center">
          <PieChart width={350} height={300}>
            <Pie
              data={nutrientData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {nutrientData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          {/* Confidence Badge */}
          <div className="mt-6 px-6 py-2 rounded-xl bg-gradient-to-r from-green-200 via-green-300 to-green-400 shadow-md text-center w-1/2 max-w-md">
            <p className="text-sm font-medium text-green-900 opacity-90">
              {t("advisory_result.nutrients.confidence")}
            </p>
            <p className="text-3xl font-extrabold text-green-800 tracking-wide mt-1">
              {result.nutrients.confidence}%
            </p>
          </div>
          </TabsContent>


      <TabsContent value="recommendations" className="flex flex-col items-center space-y-6">
      {/* Recommended Crops */}
      <div className="w-full max-w-3xl">
        <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">{t("advisory_result.recommendations.title")}</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {Object.entries(result.recommendations.crops).map(([cropName, cropData]) => (
      <div key={cropName} className="flex flex-col items-center">
        <button
          onClick={() => setOpenCrop(openCrop === cropName ? null : cropName)}
          className="px-4 py-2 bg-green-200 border border-green-500 text-green-700 
                    font-medium rounded-full shadow-sm hover:bg-green-400 transition"
        >
          {cropName}
        </button>

        {openCrop === cropName && (
          <div className="mt-4 w-80 rounded-2xl shadow-lg border border-green-100 overflow-hidden bg-white transform transition-all duration-300 hover:scale-[1.02]">
            <div className="bg-gradient-to-r from-green-400 to-green-600 px-4 py-2 text-center">
              <p className="font-bold text-white text-lg">{cropName}</p>
              <p className="text-xs text-green-50 opacity-80">{t("advisory_result.recommendations.crop_insights")}</p>
            </div>
            <div className="p-5 space-y-2 text-gray-700 text-sm">
              <p>
                <span className="font-medium text-gray-600">{t("advisory_result.recommendations.fields.confidence")}</span>{" "}
                <span className="font-semibold text-green-700">{cropData.Confidence}%</span>
              </p>
              <p>
                <span className="font-medium text-gray-600">{t("advisory_result.recommendations.fields.expected_yield")}</span>{" "}
                <span className="font-semibold text-green-700">{cropData["Expected Yield"]}</span>
              </p>
              <p>
                <span className="font-medium text-gray-600">{t("advisory_result.recommendations.fields.suitability")}</span>{" "}
                <span className="font-semibold text-green-700">{cropData.Suitability}</span>
              </p>
              <p>
                <span className="font-medium text-gray-600">{t("advisory_result.recommendations.fields.seasonal_match")}</span>{" "}
                <span className="font-semibold text-green-700">{cropData["Seasonal Match"]}</span>
              </p>
              <p>
                <span className="font-medium text-gray-600">{t("advisory_result.recommendations.fields.overall_score")}</span>{" "}
                <span className="font-semibold text-green-700">{cropData["Overall Score"]}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    ))}
        </div>
      </div>
    </TabsContent>


    <TabsContent value="ai_insights" className="flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-bold text-green-800 text-center">
        {t("advisory_result.ai_insights.title")}
      </h2>

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-green-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3">
          <h3 className="text-lg font-semibold text-white">{t("advisory_result.ai_insights.diagonstics")}</h3>
        </div>

        <div className="p-6 space-y-3 text-gray-700">
          {result.advanced_insights.map((insight, idx) => (
            <p key={idx} className="flex items-center gap-2">
              {icons[idx]} <span>{insight}</span>
            </p>
          ))}
        </div>
      </div>
    </TabsContent>
    </Tabs>
    </div>
  );
}

