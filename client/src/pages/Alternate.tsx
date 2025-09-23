// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import MapLocationInput from "@/components/soil/MapLocationInput";
// import { WaterSourceSelector } from "@/components/soil/WaterSourceSelector";
// import { FarmSizeInput } from "@/components/soil/FarmSizeInput";
// // import { SeasonDetector } from "@/components/soil/SeasonDetector";
// import { AdvisoryResult } from "@/components/soil/AdvisoryResult";
// import axios from "axios";
// import { LINK2 } from "@/store/Link";
// import { Switch } from "@/components/ui/switch"

// // TypeScript interfaces
// interface WeatherData {
//   temperature: number;
//   humidity: number;
//   rainfall: number;
//   season: string;
// }

// interface SatelliteData {
//   ndvi: number;
//   ndwi: number;
//   soil_moisture: number;
//   soil_ph: number;
// }

// interface NPKEstimates {
//   nitrogen: number;
//   phosphorus: number;
//   potassium: number;
//   confidence: number;
// }

// interface CropRecommendation {
//   crop: string;
//   confidence: number;
//   expected_yield: string;
//   suitability: string;
//   seasonal_match: string;
//   recommendation_score: number;
// }

// interface BackendResult {
//   weather_data: WeatherData;
//   satellite_data: SatelliteData;
//   npk_estimates: NPKEstimates;
//   crop_recommendations: CropRecommendation[];
//   advanced_insights: string;
// }

// interface ApiResponse {
//   success: boolean;
//   data: BackendResult;
// }

// interface ProcessedCrop {
//   Confidence: number;
//   "Expected Yield": string;
//   Suitability: string;
//   "Seasonal Match": string;
//   "Overall Score": number;
// }

// interface ProcessedResult {
//   weather: {
//     temperature: number;
//     humidity: number;
//     rainfall: number;
//     season: string;
//   };
//   satellite: {
//     ndvi: number;
//     ndwi: number;
//     soilMoisture: number;
//     ph: number;
//   };
//   nutrients: {
//     n: number;
//     p: number;
//     k: number;
//     confidence: number;
//   };
//   recommendations: {
//     confidence: number;
//     crops: { [cropName: string]: ProcessedCrop };
//   };
//   advanced_insights: string[];
// }

// export default function Alternate() {
//     const [waterSource, setWaterSource] = useState<string>("");
//   const [farmSize, setFarmSize] = useState<string>("");
//   // const [season, setSeason] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [latitude, setLatitude] = useState<string>("");
//   const [longitude, setLongitude] = useState<string>("");
//   const [result, setResult] = useState<ProcessedResult | null>(null);
//   const { t, i18n } = useTranslation();
//   const lang = i18n.language;

//   const handleSubmit = async (): Promise<void> => {
//     setLoading(true);
//     try {
//       const response = await axios.post<ApiResponse>(`${LINK2}/analyze`, {
//         latitude: latitude,
//         longitude: longitude,
//         language: lang
//       });

//       if (response.data.success) {
//         const backendResult = response.data.data;
//         console.log("Backend Result:", backendResult);
//         setResult({
//           weather: {
//             temperature: backendResult.weather_data.temperature,
//             humidity: backendResult.weather_data.humidity,
//             rainfall: backendResult.weather_data.rainfall,
//             season: backendResult.weather_data.season,
//           },
//           satellite: {
//             ndvi: backendResult.satellite_data.ndvi,
//             ndwi: backendResult.satellite_data.ndwi,
//             soilMoisture: backendResult.satellite_data.soil_moisture,
//             ph: backendResult.satellite_data.soil_ph,
//           },
//           nutrients: {
//             n: backendResult.npk_estimates.nitrogen,
//             p: backendResult.npk_estimates.phosphorus,
//             k: backendResult.npk_estimates.potassium,
//             confidence: backendResult.npk_estimates.confidence,
//           },
//           recommendations: {
//             confidence: Math.round(
//               backendResult.crop_recommendations.reduce(
//                 (acc: number, crop: CropRecommendation) => acc + crop.confidence,
//                 0
//               ) / backendResult.crop_recommendations.length
//             ), // average confidence
//             crops: backendResult.crop_recommendations.reduce(
//               (acc: { [cropName: string]: ProcessedCrop }, crop: CropRecommendation) => {
//                 acc[crop.crop] = {
//                   Confidence: crop.confidence,
//                   "Expected Yield": crop.expected_yield,
//                   Suitability: crop.suitability,
//                   "Seasonal Match": crop.seasonal_match,
//                   "Overall Score": crop.recommendation_score,
//                 };
//                 return acc;
//               },
//               {}
//             ),
//           },
//           advanced_insights: Array.isArray(backendResult.advanced_insights) 
//           ? backendResult.advanced_insights // Keep as array if it's already an array
//           : [backendResult.advanced_insights], // Convert string to single-item array
//         });
//       } else {
//         setResult(null);
//         alert(t("soil_page.alerts.noRecommendations"));
//       }
//     } catch (error: unknown) {
//       console.error("Error fetching recommendations:", error);
//       alert(t("soil_page.alerts.fetchError"));
//       setResult(null);
//     } finally {
//       setLoading(false);
//     }
//     };

//     const [useSensor, setUseSensor] = useState(false); 

//     return (
//     <div className="flex flex-col items-center mt-10">
//       <div className="min-h-screen w-full flex flex-col items-center">
//         <Card className="w-full max-w-2xl bg-white shadow-lg bg-white/60 backdrop-blur-md p-6 mt-0 mb-0 sm:mt-4 sm:mb-4 rounded-none sm:rounded-2xl">
//           <div className="flex flex-col sm:flex-row justify-between items-center">
//             <h1 className="text-3xl font-semibold text-center p-4">
//                 {t("soil_page.headings.title")} 
//             </h1>
//           </div>
          
//           <h3 className="text-md mb-4 text-center p-2 pb-4">
//             {t("soil_page.headings.subtitle")}
//           </h3>
//           <MapLocationInput
//             latitude={latitude}
//             longitude={longitude}
//             setLatitude={setLatitude}
//             setLongitude={setLongitude}
//           />
//           <WaterSourceSelector
//             waterSource={waterSource}
//             setWaterSource={setWaterSource}
//           />
//           <FarmSizeInput farmSize={farmSize} setFarmSize={setFarmSize} />
//           {/* <SeasonDetector season={season} setSeason={setSeason} /> */}

//             {useSensor && (
//                 <div>
                    
//                 </div>
//             )}

//           { useSensor ? <Button className="w-full h-10 bg-blue-600 text-md hover:bg-blue-700" onClick={() => setUseSensor(true)}>Enter Sensor Data</Button> :
//           <Button className="w-full h-10 bg-blue-600 text-md hover:bg-blue-700" onClick={() => setUseSensor(false)}>Delete Sensor Data</Button> }

//           <Button
//             className="w-full h-10 bg-green-600 text-md hover:bg-green-700 mt-6"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? (
//               <Loader2 className="h-5 w-5 animate-spin" />
//             ) : (
//               t("soil_page.buttons.getAdvisory")
//             )}
//           </Button>

//           {result && <AdvisoryResult result={result} />}
//         </Card>
//       </div>
//     </div>
//   )
// }

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import MapLocationInput from "@/components/soil/MapLocationInput";
import { WaterSourceSelector } from "@/components/soil/WaterSourceSelector";
import { FarmSizeInput } from "@/components/soil/FarmSizeInput";
import { AdvisoryResult } from "@/components/soil/AdvisoryResult";
import axios from "axios";
import { LINK2 } from "@/store/Link";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SoilSelector } from "@/components/soil/SoilSelector";

interface SensorData {
  temperature: number | "";
  humidity: number | "";
  rainfall: number | "";
  soilMoisture: number | "";
  pH: number | "";
  n: number | "";
  p: number | "";
  k: number | "";
}

interface ApiResponse {
  success: boolean;
  data: BackendResult;
}

interface BackendResult {
  weather_data: WeatherData;
  satellite_data: SatelliteData;
  npk_estimates: NPKEstimates;
}

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  season: string;
}

interface SatelliteData {
  ndvi: number;
  ndwi: number;
  soil_moisture: number;
  soil_ph: number;
}

interface NPKEstimates {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  confidence: number;
}

export default function Alternate() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [waterSource, setWaterSource] = useState("");
  const [soilType, setSoilType] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [useSensor, setUseSensor] = useState(true);
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: "",
    humidity: "",
    rainfall: "",
    soilMoisture: "",
    pH: "",
    n: "",
    p: "",
    k: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [geminiResponse, setGeminiResponse] = useState<string>("");

  const handleSensorChange = (
    field: keyof SensorData,
    value: string,
    min: number,
    max: number
  ) => {
    let num = parseFloat(value);
    if (isNaN(num)) {
      setSensorData((prev) => ({ ...prev, [field]: "" }));
      return;
    }
    if (num < min) {
      alert(`${field} cannot be less than ${min}. Automatically adjusted.`);
      num = min;
    } else if (num > max) {
      alert(`${field} cannot be greater than ${max}. Automatically adjusted.`);
      num = max;
    }
    setSensorData((prev) => ({ ...prev, [field]: num }));
  };

  const handleSubmit = async (): Promise<void> => {
    if (useSensor) {
      await handleSubmit2();
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post<ApiResponse>(`${LINK2}/analyze`, {
        latitude: latitude,
        longitude: longitude,
        language: lang,
        waterSource,
        farmSize,
      });

      if (response.data.success) {
        const backendResult = response.data.data;
        setResult({
          weather: {
            temperature: backendResult.weather_data.temperature,
            humidity: backendResult.weather_data.humidity,
            rainfall: backendResult.weather_data.rainfall,
            season: backendResult.weather_data.season,
          },
          satellite: {
            ndvi: backendResult.satellite_data.ndvi,
            ndwi: backendResult.satellite_data.ndwi,
            soilMoisture: backendResult.satellite_data.soil_moisture,
            ph: backendResult.satellite_data.soil_ph,
          },
          nutrients: {
            n: backendResult.npk_estimates.nitrogen,
            p: backendResult.npk_estimates.phosphorus,
            k: backendResult.npk_estimates.potassium,
            confidence: backendResult.npk_estimates.confidence,
          },
        });
      } else {
        setResult(null);
        alert(t("soil_page.alerts.noRecommendations"));
      }
    } catch (error: unknown) {
      console.error("Error fetching recommendations:", error);
      alert(t("soil_page.alerts.fetchError"));
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit2 = async () => {
    setLoading(true);
    try {
      // Send sensor data to your Gemini-connected endpoint
      const response = await axios.post(`${LINK2}/sensor-analyze`, {
        ...sensorData,
        latitude,
        longitude,
        waterSource,
        farmSize,
        language: lang,
      });

      console.log("Gemini response:", response.data);
      setGeminiResponse(response.data.message); // expected { message: string }
    } catch (err) {
      console.error("Error with Gemini fetch:", err);
      setGeminiResponse("An error occurred while fetching Gemini response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <Card className="w-full max-w-2xl bg-white shadow-lg p-6 rounded-2xl mb-6">
        {/* Title and switch */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold text-center p-4">
            {t("soil_page.headings.title")}
          </h1>
          <div className="flex items-center space-x-3">
            <span
              className={`${!useSensor ? "text-gray-900" : "text-gray-400"}`}
            >
              No Sensor Data
            </span>
            <Switch
              checked={useSensor}
              onCheckedChange={setUseSensor}
              className="data-[state=checked]:bg-green-500"
            />
            <span
              className={`${useSensor ? "text-gray-900" : "text-gray-400"}`}
            >
              Use Sensor Data
            </span>
          </div>
        </div>

        <h3 className="text-md mb-4 text-center p-2 pb-4">
          {t("soil_page.headings.subtitle")}
        </h3>

        <MapLocationInput
          latitude={latitude}
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
        <WaterSourceSelector
          waterSource={waterSource}
          setWaterSource={setWaterSource}
        />

        <SoilSelector
          soilType={soilType}
          setSoilType={setSoilType}
        />

        <FarmSizeInput farmSize={farmSize} setFarmSize={setFarmSize} />


        {/* Extra inputs only if using sensor data */}
        {useSensor && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {[
              { field: "temperature", label: "Temperature (°C)", min: -50, max: 60 },
              { field: "humidity", label: "Humidity (%)", min: 0, max: 100 },
              { field: "rainfall", label: "Rainfall (mm)", min: 0, max: 500 },
              { field: "soilMoisture", label: "Soil Moisture (%)", min: 0, max: 100 },
              { field: "pH", label: "pH", min: 0, max: 14 },
              { field: "n", label: "Nitrogen (N)", min: 0, max: 200 },
              { field: "p", label: "Phosphorus (P)", min: 0, max: 200 },
              { field: "k", label: "Potassium (K)", min: 0, max: 200 },
            ].map(({ field, label, min, max }) => (
              <div key={field}>
                <Label>{label}</Label>
                <Input
                  type="text"
                  value={sensorData[field as keyof SensorData]}
                  onChange={(e) =>
                    handleSensorChange(
                      field as keyof SensorData,
                      e.target.value,
                      min,
                      max
                    )
                  }
                  placeholder={`Enter ${label}`}
                />
              </div>
            ))}
          </div>
        )}

        <Button
          className="w-full h-10 bg-green-600 text-md hover:bg-green-700 my-6"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            t("soil_page.buttons.getAdvisory")
          )}
        </Button>

        {/* Normal advisory result */}
        {result && <AdvisoryResult result={result} />}

        {/* Gemini response block */}
        {geminiResponse && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h4 className="font-semibold mb-2">Gemini Advisory</h4>
            <p className="whitespace-pre-line">{geminiResponse}</p>
          </div>
        )}
      </Card>
    </div>
  );
}
