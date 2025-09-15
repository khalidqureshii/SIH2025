import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LocationInput } from "@/components/soil/LocationInput";
import { WaterSourceSelector } from "@/components/soil/WaterSourceSelector";
import { FarmSizeInput } from "@/components/soil/FarmSizeInput";
// import { SeasonDetector } from "@/components/soil/SeasonDetector";
import { AdvisoryResult } from "@/components/soil/AdvisoryResult";
import axios from "axios";
import {LINK2} from "@/store/Link";

export default function SoilAdvisoryPage() {
  const { t } = useTranslation();

  const [waterSource, setWaterSource] = useState<string>("");
  const [farmSize, setFarmSize] = useState<string>("");
  // const [season, setSeason] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async () => {
    setLoading(true);
    // Replace this with actual backend API call later
    try {
      const response = await axios.post(`${LINK2}/analyze`, {
        latitude: latitude,
        longitude: longitude,
        // manual_inputs: {
        //   waterSource: waterSource,
        //   farmSize: farmSize
        // }
      });

      if (response.data.success) {
        const backendResult = response.data.data; // this is an array of recommendations
        console.log("Backend Result:", backendResult);
        setResult({
          // weather: { temperature: 25, humidity: 76, rainfall: 5, season: "Kharif" },
          // satellite: { ndvi: 0.567, ndwi: 0.123, soilMoisture: 1.56, ph: 6.5 },
          // nutrients: { n: 145.73, p: 62.45, k: 320.12, confidence: 95 },
          // recommendations: backendResult,
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
                (acc: any, crop: any) => acc + crop.confidence,
                0
              ) / backendResult.crop_recommendations.length
            ), // average confidence
            crops: backendResult.crop_recommendations.reduce(
              (acc: any, crop: any) => {
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
          advanced_insights: backendResult.advanced_insights,
        });
      } else {
        setResult(null);
        alert(t("soil_page.alerts.noRecommendations"));
      }
    } catch (error: any) {
      console.error("Error fetching recommendations:", error);
      alert(t("soil_page.alerts.fetchError"));
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Card className="w-full max-w-2xl rounded-2xl bg-white shadow-lg bg-white/60 backdrop-blur-md p-6 mt-4">
        <h1 className="text-3xl font-semibold text-center p-4">
          {t("soil_page.headings.title")}
        </h1>
        <h3 className="text-md mb-4 text-center p-2  pb-4">
          {t("soil_page.headings.subtitle")}
        </h3>
        <LocationInput
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
  );
}
