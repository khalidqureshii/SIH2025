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
    nvdi: null,
    ndwi: null,
    temperature: null,
    humidity: null,
    rainfall: null,
    soilMoisture: null,
    pH: null,
    n: null,
    p: null,
    k: null,
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

    console.log(sensorData);
  };

  const handleSubmit = async (): Promise<void> => {
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
        if (useSensor) {
          if (sensorData.nvdi === null) {
            sensorData.nvdi = backendResult.satellite_data.ndvi;
          }
          if (sensorData.ndwi === null) {
            sensorData.ndwi = backendResult.satellite_data.ndwi;
          }
          if (sensorData.temperature === null) {  
            sensorData.temperature = backendResult.weather_data.temperature;
          }
          if (sensorData.humidity === null) {
            sensorData.humidity = backendResult.weather_data.humidity;
          }
          if (sensorData.rainfall === null) {
            sensorData.rainfall = backendResult.weather_data.rainfall;
          }
          if (sensorData.soilMoisture === null) {
            sensorData.soilMoisture = backendResult.satellite_data.soil_moisture;
          }
          if (sensorData.pH === null) {
            sensorData.pH = backendResult.satellite_data.soil_ph;
          }
          if (sensorData.n === null) {
            sensorData.n = backendResult.npk_estimates.nitrogen;
          }
          if (sensorData.p === null) {
            sensorData.p = backendResult.npk_estimates.phosphorus;
          }
          if (sensorData.k === null) {
            sensorData.k = backendResult.npk_estimates.potassium;
          }

          console.log("Merged Sensor Data:", sensorData);
          setSensorData(sensorData);

          await handleSubmit2(sensorData);
          return;
        } else {
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
        }
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

  const handleSubmit2 = async (data: SensorData): Promise<void> => {
    setLoading(true);
    try {
      const formBody = {
        ...data,
        latitude: latitude,
        longitude: longitude,
        waterSource,
        farmSize,
        language: i18n.language,
      }

      console.log("Submitting to Gemini with body:", formBody);

      const response = await axios.post(`${LINK2}/sensor-analyze`, {
        ...formBody
      });

      console.log("Gemini response:", response.data);
      var temp = response.data.advice;
      console.log("Display Text:", temp);

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
      <Card className="w-full max-w-2xl bg-white shadow-lg p-6 rounded-2xl mb-6 mt-10">

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
        <SoilSelector soilType={soilType} setSoilType={setSoilType} />
        <FarmSizeInput farmSize={farmSize} setFarmSize={setFarmSize} />

        {useSensor && (
          <div className="mt-6 space-y-6">

            <div>
              <Label className="mb-2 flex items-center space-x-2">
                <span>{t("soil_page.labels.rainfall")}</span>
                <span className="text-sm font-medium text-gray-700">
                  : {sensorData.rainfall ?? 0} mm
                </span>
              </Label>
              <Input
                type="number"
                value={sensorData.rainfall ?? ""}
                onChange={(e) =>
                  handleSensorChange("rainfall", e.target.value, 0, 500)
                }
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
                        : {sensorData[field as keyof SensorData] ?? 0}{unit}
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
                            ? (sensorData[field as keyof SensorData] as number)
                            : min,
                        ]}
                        onValueChange={(val: any[]) =>
                          handleSensorChange(
                            field as keyof SensorData,
                            String(val[0]),
                            min,
                            max
                          )
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
                        : {sensorData[field as keyof SensorData] ?? 0}
                      </span>
                    </Label>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">0</span>
                      <Slider
                        min={0}
                        max={200}
                        step={1}
                        value={[
                          sensorData[field as keyof SensorData] as number || 0,
                        ]}
                        onValueChange={(val: any[]) =>
                          handleSensorChange(
                            field as keyof SensorData,
                            String(val[0]),
                            0,
                            200
                          )
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
                  : {sensorData.temperature ?? 25}°C
                </span>
              </Label>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">-40</span>
                <Slider
                  min={-40}
                  max={60}
                  step={0.5}
                  value={[sensorData.temperature ?? 25]}
                  onValueChange={(val: any[]) =>
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
