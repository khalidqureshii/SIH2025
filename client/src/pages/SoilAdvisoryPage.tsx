import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import MapLocationInput from "@/components/soil/MapLocationInput";
import { WaterSourceSelector } from "@/components/soil/WaterSourceSelector";
import { FarmSizeInput } from "@/components/soil/FarmSizeInput";
// import { SeasonDetector } from "@/components/soil/SeasonDetector";
import { AdvisoryResult } from "@/components/soil/AdvisoryResult";
import axios from "axios";
import { LINK2 } from "@/store/Link";

// TypeScript interfaces
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

interface CropRecommendation {
  crop: string;
  confidence: number;
  expected_yield: string;
  suitability: string;
  seasonal_match: string;
  recommendation_score: number;
}

interface BackendResult {
  weather_data: WeatherData;
  satellite_data: SatelliteData;
  npk_estimates: NPKEstimates;
  crop_recommendations: CropRecommendation[];
  advanced_insights: string;
}

interface ApiResponse {
  success: boolean;
  data: BackendResult;
}

interface ProcessedCrop {
  Confidence: number;
  "Expected Yield": string;
  Suitability: string;
  "Seasonal Match": string;
  "Overall Score": number;
}

interface ProcessedResult {
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
    crops: { [cropName: string]: ProcessedCrop };
  };
  advanced_insights: string[];
}

export default function SoilAdvisoryPage() {
  const [waterSource, setWaterSource] = useState<string>("");
  const [farmSize, setFarmSize] = useState<string>("");
  // const [season, setSeason] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [result, setResult] = useState<ProcessedResult | null>(null);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.post<ApiResponse>(`${LINK2}/analyze`, {
        latitude: latitude,
        longitude: longitude,
        language: lang
        // manual_inputs: {
        //   waterSource: waterSource,
        //   farmSize: farmSize
        // }
      });

      if (response.data.success) {
        const backendResult = response.data.data;
        console.log("Backend Result:", backendResult);
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
          recommendations: {
            confidence: Math.round(
              backendResult.crop_recommendations.reduce(
                (acc: number, crop: CropRecommendation) => acc + crop.confidence,
                0
              ) / backendResult.crop_recommendations.length
            ), // average confidence
            crops: backendResult.crop_recommendations.reduce(
              (acc: { [cropName: string]: ProcessedCrop }, crop: CropRecommendation) => {
                acc[crop.crop] = {
                  Confidence: crop.confidence,
                  "Expected Yield": crop.expected_yield,
                  Suitability: crop.suitability,
                  "Seasonal Match": crop.seasonal_match,
                  "Overall Score": crop.recommendation_score,
                };
                return acc;
              },
              {}
            ),
          },
          advanced_insights: Array.isArray(backendResult.advanced_insights) 
          ? backendResult.advanced_insights // Keep as array if it's already an array
          : [backendResult.advanced_insights], // Convert string to single-item array
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

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="min-h-screen w-full flex flex-col items-center">
        <Card className="w-full max-w-2xl bg-white shadow-lg bg-white/60 backdrop-blur-md p-6 mt-0 mb-0 sm:mt-4 sm:mb-4 rounded-none sm:rounded-2xl">
          <h1 className="text-3xl font-semibold text-center p-4">
            {t("soil_page.headings.title")}
          </h1>
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
          <FarmSizeInput farmSize={farmSize} setFarmSize={setFarmSize} />
          {/* <SeasonDetector season={season} setSeason={setSeason} /> */}

          <Button
            className="w-full h-10 bg-green-600 text-md hover:bg-green-700"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              t("soil_page.buttons.getAdvisory")
            )}
          </Button>

          {result && <AdvisoryResult result={result} />}
        </Card>
      </div>
    </div>
  );
}