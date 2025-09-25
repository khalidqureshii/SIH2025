import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PlantIdentifier from "./PlantIdentifier"; // ✅ import your component
import DiseaseDetectionPage from "./DiseaseDetectionPage"; // ✅ import your component
import { useTranslation } from "react-i18next";

const CropAssistantPage: React.FC = () => {

  const {t} = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center py-6">
  <h1 className="text-3xl font-semibold text-center p-4">
    {t("disease_plant.title")}
  </h1>
<Tabs defaultValue="plant" className="w-full max-w-5xl flex flex-col items-center">
  {/* Tabs Header */}
  <TabsList className="grid w-full sm:w-[70%] md:w-[45%] grid-cols-2 h-[50px] 
    bg-white/60 rounded-none sm:rounded-xl p-1 px-2 mt-6">
    
    <TabsTrigger
      value="plant"
      className="data-[state=active]:bg-green-600 data-[state=active]:text-white 
      text-sm sm:text-base md:text-lg"
    >
      {t("disease_plant.tabs.identify_crops")}
    </TabsTrigger>

    <TabsTrigger
      value="disease"
      className="data-[state=active]:bg-green-600 data-[state=active]:text-white 
      text-sm sm:text-base md:text-lg"
    >
      {t("disease_plant.tabs.detect_disease")}
    </TabsTrigger>
  </TabsList>

  {/* Plant Identifier */}
  <TabsContent value="plant" className="mt-3 flex justify-center w-full">
    <PlantIdentifier />
  </TabsContent>

  {/* Disease Detection */}
  <TabsContent value="disease" className="mt-3 flex justify-center w-full">
    <DiseaseDetectionPage />
  </TabsContent>
</Tabs>

</div>

  );
};

export default CropAssistantPage;
