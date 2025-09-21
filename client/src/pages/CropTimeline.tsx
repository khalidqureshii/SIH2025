"use client";
import React, { useState } from "react";
import cropData from "@/components/cropTimeLine/timeline";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

interface ScalableResources {
  [key: string]: [number, number];
}

interface StageResource {
  [key: string]: string;
}

interface CropStage {
  stage: string;
  duration: string;
  resources: StageResource;
  scalableResources: ScalableResources;
  temperature: string;
  description: string | undefined;
}

interface CropInfo {
  name: string;
  growthPeriod: string;
  timeline: CropStage[];
}

const CropTimeline: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [landArea, setLandArea] = useState<number>(1);
  const [areaUnit, setAreaUnit] = useState<string>("acre");
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const {t, i18n} = useTranslation();
  const lang = i18n.language; 

  const unitConversions: { [key: string]: number } = {
    acre: 1,
    hectare: 2.47105,
  };
  const currentCrop: CropInfo | null = selectedCrop ? cropData[selectedCrop] : null;

  const handleCropChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCrop(e.target.value);
    setSelectedStage(null);
  };

  const handleLandAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value);
    setLandArea(isNaN(value) || value <= 0 ? 1 : value);
  };

  const handleAreaUnitChange = (value: string) => {
    setAreaUnit(value);
  };

  const handleStageClick = (index: number) => {
    setSelectedStage(selectedStage === index ? null : index);
  };

  const normalizedArea: number = landArea * unitConversions[areaUnit];

  const getScaledResource = (resource: string, range: [number, number]): string => {
    if (!range || range.length !== 2) return resource;

    if (Array.isArray(range)) {
      const [min, max] = range;
      return `${Math.round(min * normalizedArea)}-${Math.round(
        max * normalizedArea
      )} ${resource.split(" ").slice(2).join(" ")}`;
    }

    return resource;
  };

  const getResourceIcon = (resourceType: string): JSX.Element => {
    switch (resourceType.toLowerCase()) {
      case "labor":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case "water":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        );
      case "equipment":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        );
      case "fertilizer":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
            <path d="M9 17v4" />
            <path d="M15 17v4" />
          </svg>
        );
      case "seeds":
      case "seedlings":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 10a6 6 0 0 0-6-6 6 6 0 0 0 0 12 6 6 0 0 0 6-6Z" />
            <path d="M12 14a6 6 0 0 0 6 6 6 6 0 0 0 0-12 6 6 0 0 0-6 6Z" />
          </svg>
        );
      case "pesticides":
      case "herbicides":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8.4 10.6a2.1 2.1 0 1 1 2.99 2.98L6 19l-3-3 5.4-5.4" />
            <path d="m2 22 3-3" />
            <path d="M18 2 6 14" />
            <path d="m17 7 3 3" />
            <path d="M15 5 5 15" />
          </svg>
        );
      case "storage":
      case "drying":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
            <path d="M12 3v6" />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        );
    }
  };

  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const filteredCrops = Object.keys(cropData).filter((key) =>
    cropData[key].name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (cropKey: string) => {
    setSelectedCrop(cropKey);
    setQuery(cropData[cropKey].name);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
    <div className="w-full max-w-3xl bg-white shadow-lg bg-white/60 backdrop-blur-md p-6 sm:mt-4 sm:mb-4 rounded-none sm:rounded-2xl mt-5 mb-5">

      <h1 className="text-3xl font-semibold mb-6 text-center">
        {t("timeline_page.headings.title")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Search Crop */}
        <div className="bg-white/60  p-4 rounded-lg shadow-sm border border-lime-200 relative">
          <label
            htmlFor="crop-search"
            className="block text-sm font-medium text-lime-900 mb-2"
          >
            {t("timeline_page.form.searchLabel")}
          </label>
          <Input
            id="crop-search"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            placeholder={t("timeline_page.form.searchPlaceholder")}
          />

          {showResults && query && (
            <ul className="absolute z-10 w-[90%] bg-white border border-lime-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
              {filteredCrops.length > 0 ? (
                filteredCrops.map((cropKey) => (
                  <li
                    key={cropKey}
                    onClick={() => handleSelect(cropKey)}
                    className="px-4 py-2 cursor-pointer hover:bg-lime-100"
                  >
                    {cropData[cropKey].name}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">{t("timeline_page.form.noCropsFound")}</li>
              )}
            </ul>
          )}
        </div>

        {/* Land Area + Unit */}
        <div className="bg-white/60 p-4 rounded-lg shadow-sm border border-lime-200">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="land-area"
                className="block text-sm font-medium text-lime-900 mb-2"
              >
                {t("timeline_page.form.areaLabel")}
              </label>
              <Input
                id="land-area"
                type="number"
                min="0.1"
                step="0.1"
                value={landArea}
                onChange={handleLandAreaChange}
              />
            </div>

              <div className="w-1/3">
              <label
                htmlFor="area-unit"
                className="block text-sm font-medium text-lime-900 mb-2"
              >
                {t("timeline_page.form.unitLabel")}:
              </label>

              <Select value={areaUnit} onValueChange={(value) => handleAreaUnitChange(value)}>
                <SelectTrigger id="area-unit">
                  <SelectValue placeholder={t("timeline_page.form.selectUnitPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acre">{t("timeline_page.form.unitOptions.acre")}</SelectItem>
                  <SelectItem value="hectare">{t("timeline_page.form.unitOptions.hectare")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {currentCrop ? (
  <div className="mt-6">
    <h2 className="text-xl font-semibold text-lime-800 mb-4">
      {t("timeline_page.messages.growthTimeline")} {currentCrop.name}
    </h2>

    <div className="relative">
      <div className="absolute top-0 bottom-0 left-[15px] w-0.5 bg-lime-300"></div>
      <div className="space-y-6">
        {currentCrop.timeline.map((stage, index) => (
          <div key={index} className="relative">
            <div
              className={`flex items-start cursor-pointer ${
                selectedStage === index ? "mb-4" : ""
              }`}
              onClick={() => handleStageClick(index)}
            >
              <div
                className={`z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  selectedStage === index
                    ? "bg-lime-500 border-lime-600"
                    : "bg-white border-lime-400"
                }`}
              >
                <span className="text-sm font-medium">{index + 1}</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-lime-800">
                  {stage.stage}
                </h3>
                <p className="text-sm text-lime-600">{stage.duration}</p>
              </div>
            </div>

            {selectedStage === index && (
              <div className="ml-12 p-4 bg-white/70 rounded-lg border border-lime-200 shadow-sm">
                <div className="mb-3">
                  <div className="flex items-center text-sm text-amber-600 mb-1">
                    {/* icon */}
                    {t("timeline_page.messages.optimalTemperature")}
                  </div>
                  <p className="ml-7 text-gray-700">{stage.temperature}</p>
                </div>

                <h4 className="font-medium text-lime-700 mb-2">
                  {t("timeline_page.messages.resourcesNeeded")}
                </h4>
                <ul className="space-y-2">
                  {Object.entries(stage.resources).map(([key, value]) => (
                    <li key={key} className="flex items-center">
                      {getResourceIcon(key)}
                      <span className="text-gray-700">
                        <span className="font-medium">{key}: </span>
                        {stage.scalableResources && stage.scalableResources[key]
                          ? getScaledResource(
                              value,
                              stage.scalableResources[key]
                            )
                          : value}
                      </span>
                    </li>
                  ))}
                </ul>
                <h4 className="font-medium text-green-700 mb-2 mt-4">
                  {t("timeline_page.messages.processToFollow")}
                </h4>
                <p className="ml-7 text-gray-700">{stage.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
) : (
  <p className="mt-6 text-gray-500 text-center">
    {t("timeline_page.messages.noCropSelected")}
  </p>
)}

      
    </div>
    </div>
  );
};

export default CropTimeline;