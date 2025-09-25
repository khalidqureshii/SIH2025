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
  moisture: number | null;
  ph: number | null;
  n: number | null;
  p: number | null;
  k: number | null;
  nvdi: number | null;
  ndwi: number | null;
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
    moisture: null,
    ph: null,
    n: null,
    p: null,
    k: null,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [geminiResponse] = useState<string>("");

  const handleSensorChange = (
    field: keyof SensorData,
    value: string,
    min: number,
    max: number
  ) => {
    let num = parseFloat(value);
    if (isNaN(num)) return;
    if (num < min) num = min;
    if (num > max) num = max;
    setSensorData((prev) => ({ ...prev, [field]: num }));
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.post(`${LINK2}/analyze`, {
        latitude,
        longitude,
        language: lang,
        waterSource,
        farmSize,
      });

      if (response.data.success) {
        setResult(response.data.data);
      }
    } catch (error) {
      console.error(error);
      alert(t("soil_page.alerts.fetchError"));
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
                <span className="text-xs text-gray-500">-10</span>
                <Slider
                  min={-10}
                  max={60}
                  step={0.5}
                  value={[sensorData.temperature ?? 25]}
                  onValueChange={(val: any[]) =>
                    handleSensorChange("temperature", String(val[0]), -50, 60)
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
