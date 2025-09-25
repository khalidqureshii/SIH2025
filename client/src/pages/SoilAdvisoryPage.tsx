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
import { SoilSelector } from "@/components/soil/SoilSelector";
import ReactMarkdown from "react-markdown";
import { Slider } from "@/components/ui/slider";
import { toast } from "react-toastify";

interface SensorData {
  temperature: number | null;
  humidity: number | null;
  rainfall: number | null;
  soilMoisture: number | null;
  pH: number | null;
  n: number | null;
  p: number | null;
  k: number | null;
  nvdi: number | null;
  ndwi: number | null;
}

interface ApiResponse {
  success: boolean;
  data: BackendResult;
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
  fertilizer_guidance?: string[] | string;
}

interface NPKEstimates {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  confidence: number;
}

interface ProcessedCrop {
  Confidence: number;
  "Expected Yield": string;
  Suitability: string;
  "Seasonal Match": string;
  "Overall Score": number;
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

  // ✅ Default values set to 50% midpoint
  const [sensorData, setSensorData] = useState<SensorData>({
    nvdi: 0.5,          // midpoint of 0 → 1 (normalized index)
    ndwi: 0.5,          // midpoint of 0 → 1
    temperature: 10,    // midpoint of -40 → 60
    humidity: 50,       // midpoint of 0 → 100
    rainfall: 250,      // midpoint of 0 → 500
    soilMoisture: 50,   // midpoint of 0 → 100
    pH: 7,              // midpoint of 0 → 14
    n: 100,             // midpoint of 0 → 200
    p: 100,             // midpoint of 0 → 200
    k: 100,             // midpoint of 0 → 200
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
      setSensorData((prev) => ({ ...prev, [field]: null }));
      return;
    }
    if (num < min) {
      toast.info(`${field} cannot be less than ${min}. Automatically adjusted.`);
      num = min;
    } else if (num > max) {
      toast.info(`${field} cannot be greater than ${max}. Automatically adjusted.`);
      num = max;
    }
    setSensorData((prev) => ({ ...prev, [field]: num }));
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    setGeminiResponse("");
    try {
      const response = await axios.post<ApiResponse>(`${LINK2}/analyze`, {
        latitude,
        longitude,
        language: lang,
      });

      if (response.data.success) {
        const backendResult = response.data.data;
        if (useSensor) {
          if (sensorData.nvdi === null) sensorData.nvdi = backendResult.satellite_data.ndvi;
          if (sensorData.ndwi === null) sensorData.ndwi = backendResult.satellite_data.ndwi;
          if (sensorData.temperature === null) sensorData.temperature = backendResult.weather_data.temperature;
          if (sensorData.humidity === null) sensorData.humidity = backendResult.weather_data.humidity;
          if (sensorData.rainfall === null) sensorData.rainfall = backendResult.weather_data.rainfall;
          if (sensorData.soilMoisture === null) sensorData.soilMoisture = backendResult.satellite_data.soil_moisture;
          if (sensorData.pH === null) sensorData.pH = backendResult.satellite_data.soil_ph;
          if (sensorData.n === null) sensorData.n = backendResult.npk_estimates.nitrogen;
          if (sensorData.p === null) sensorData.p = backendResult.npk_estimates.phosphorus;
          if (sensorData.k === null) sensorData.k = backendResult.npk_estimates.potassium;

          setSensorData(sensorData);
          await handleSubmit2(sensorData);
          return;
        }
        
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
                (acc: number, crop: CropRecommendation) =>
                  acc + crop.confidence,
                0
              ) / backendResult.crop_recommendations.length
            ), // average confidence
            crops: backendResult.crop_recommendations.reduce(
              (
                acc: { [cropName: string]: ProcessedCrop },
                crop: CropRecommendation
              ) => {
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
          fertilizer_guidance: Array.isArray(backendResult.fertilizer_guidance)
            ? backendResult.fertilizer_guidance
            : backendResult.fertilizer_guidance
            ? [backendResult.fertilizer_guidance]
            : undefined,
        });
      } else {
        setResult(null);
        alert(t("soil_page.alerts.noRecommendations"));
      }
    } catch (error: unknown) {
      console.error("Error fetching recommendations:", error);
      toast.warn(t("soil_page.alerts.noRecommendations"));
      console.error("Error fetching recommendations:", error);
      toast.error(t("soil_page.alerts.fetchError"));
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit2 = async (data: SensorData): Promise<void> => {
    setResult(null);
    setLoading(true);
    try {
      const formBody = {
        ...data,
        latitude,
        longitude,
        waterSource,
        farmSize,
        language: i18n.language,
      };

      const response = await axios.post(`${LINK2}/sensor-analyze`, formBody);

      var temp = response.data.advice;
      setGeminiResponse(temp);
    } catch (err) {
      console.error("Error with Gemini fetch:", err);
      setGeminiResponse("An error occurred while fetching Gemini response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-4xl bg-white shadow-lg p-6 rounded-none md:rounded-2xl mb-6 mt-10">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold text-center p-4">
            {t("soil_page.headings.title")}
          </h1>
          <div className="flex items-center space-x-3">
            <Switch
              checked={useSensor}
              onCheckedChange={setUseSensor}
              className="data-[state=checked]:bg-green-500"
            />
            <span className={`${useSensor ? "text-gray-900" : "text-gray-400"}`}>
              {t("soil_page.labels.useSensor")}
            </span>
          </div>
        </div>

        <MapLocationInput latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude} />
        <WaterSourceSelector waterSource={waterSource} setWaterSource={setWaterSource} />
        <SoilSelector soilType={soilType} setSoilType={setSoilType} />
        <FarmSizeInput farmSize={farmSize} setFarmSize={setFarmSize} />

        {useSensor && (
          <div className="mt-6 space-y-6">
            <div>
              <Label className="mb-2 flex items-center space-x-2">
                <span>{t("soil_page.labels.rainfall")}</span>
                <span className="text-sm font-medium text-gray-700">
                  : {sensorData.rainfall} mm
                </span>
              </Label>
              <Input
                type="number"
                value={sensorData.rainfall ?? ""}
                onChange={(e) => handleSensorChange("rainfall", e.target.value, 0, 500)}
                placeholder="0 - 500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-6">
                {[
                  { field: "ph", min: 0, max: 14, step: 0.1, unit: "" },
                  { field: "humidity", min: 0, max: 100, step: 1, unit: "%" },
                  { field: "moisture", min: 0, max: 100, step: 0.5, unit: "%" },
                ].map(({ field, min, max, step, unit }) => (
                  <div key={field}>
                    <Label className="mb-2 flex items-center space-x-2">
                      <span>{t(`soil_page.labels.${field}`)}</span>
                      <span className="text-sm font-medium text-gray-700">
                        : {sensorData[field as keyof SensorData]}{unit}
                      </span>
                    </Label>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{min}</span>
                      <Slider
                        min={min}
                        max={max}
                        step={step}
                        value={[
                          sensorData[field as keyof SensorData] !== null
                            ? Number(sensorData[field as keyof SensorData])
                            : min,
                        ]}
                        onValueChange={(val: number[]) =>
                          handleSensorChange(field as keyof SensorData, String(val[0]), min, max)
                        }
                        className="flex-1"
                      />
                      <span className="text-xs text-gray-500">{max}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col space-y-6">
                {["n", "p", "k"].map((field) => (
                  <div key={field}>
                    <Label className="mb-2 flex items-center space-x-2">
                      <span>{t(`soil_page.labels.${field}`)}</span>
                      <span className="text-sm font-medium text-gray-700">
                        : {sensorData[field as keyof SensorData]}
                      </span>
                    </Label>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">0</span>
                      <Slider
                        min={0}
                        max={200}
                        step={1}
                        value={[
                          (sensorData[field as keyof SensorData] as number) || 0,
                        ]}
                        onValueChange={(val: number[]) =>
                          handleSensorChange(field as keyof SensorData, String(val[0]), 0, 200)
                        }
                        className="flex-1"
                      />
                      <span className="text-xs text-gray-500">200</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-2 flex items-center space-x-2">
                <span>{t("soil_page.labels.temperature")}</span>
                <span className="text-sm font-medium text-gray-700">
                  : {sensorData.temperature}°C
                </span>
              </Label>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">-40</span>
                <Slider
                  min={-40}
                  max={60}
                  step={0.5}
                  value={[sensorData.temperature ?? 10]}
                  onValueChange={(val: number[]) =>
                    handleSensorChange("temperature", String(val[0]), -40, 60)
                  }
                  className="flex-1"
                />
                <span className="text-xs text-gray-500">60</span>
              </div>
            </div>
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

        {result && <AdvisoryResult result={result} />}

        {geminiResponse && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <ReactMarkdown className="prose prose-lg max-w-none">
              {geminiResponse}
            </ReactMarkdown>
          </div>
        )}
      </Card>
    </div>
  );
}
