import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Upload, Sprout } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LINK2 } from "@/store/Link";

type PlantResult = {
  crop: string;
};

const PlantIdentifier: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlantResult | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!image) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("language", lang);

      // POST request (adjust API endpoint as per your backend)
      const res = await fetch(`${LINK2}/identify-crops`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload image!");

      const data = await res.json();

      setResult({
        crop: data.result.crop,
      });
    } catch (e) {
      console.log("Error while uploading the file", e);
      alert("Failed to identify the plant. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-6">
      <Card
        className={`w-full ${
          result ? "max-w-4xl" : "max-w-md"
        } shadow-lg rounded-2xl border border-white/20 
        bg-gradient-to-tr from-blue-50 to-blue-100 backdrop-blur-md transition-all duration-500 m-7`}
      >
        <div className="flex flex-col items-center pt-4">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <Sprout className="w-8 h-8 text-blue-600" />
            {t("plant-identifier-page.header.title")}
          </h1>
          <p className=" mb-6 text-center max-w-md text-blue-700">
            {t("plant-identifier-page.header.description")}
          </p>
        </div>

        <CardContent className="p-6 flex flex-col items-center gap-6">
          {/* Upload Section */}
          {!preview && (
            <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-blue-400 bg-blue-50 p-8 rounded-xl w-full hover:bg-blue-100 transition">
              <Upload className="h-12 w-12 mb-3 text-blue-600" />
              <p className="text-sm text-blue-600 font-medium">
                {t("plant-identifier-page.uploadSection.tapToUpload")}
              </p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}

          {/* Preview Section */}
          {preview && (
            <div className="flex flex-col items-center gap-4 w-full">
              <img
                src={preview}
                alt={t("plant-identifier-page.previewSection.altPreview")}
                className="w-56 h-56 object-cover rounded-xl border-2 border-blue-300 shadow-md"
              />
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-56 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    {t("plant-identifier-page.previewSection.analyzing")}
                  </>
                ) : (
                  t("plant-identifier-page.previewSection.identifyPlant")
                )}
              </Button>
            </div>
          )}

          {/* Result Section */}
          {result && !loading && (
            <div className="mt-4 w-full text-center bg-blue-50 border rounded-xl border-blue-200 p-6 shadow-inner">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">
                🌱 {result.crop}
              </h2>
              <p className="text-blue-700">
                {/* This looks like a{" "}changehere */}
                {t("plant-identifier-page.resultSection.plantIdentify")}{" "}
                <span className="font-semibold">{result.crop}</span>.
              </p>

              {/* New Button */}
              <Button
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                  setResult(null);
                }}
                className="mt-4 w-56 border-2 border-blue-800 text-blue-800 bg-white hover:bg-blue-100 hover:text-blue-900 transition"
              >
                {t("plant-identifier-page.resultSection.uploadAnotherImage")}
              </Button>
            </div>
          )}

          {/* {result && !loading && (
            <div className="mt-4 w-full text-center bg-blue-50 border rounded-xl border-blue-200 p-6 shadow-inner">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">
                🌱 {result.crop}
              </h2>
              <p className="text-blue-700">
                This looks like a{" "}
                <span className="font-semibold">{result.crop}</span>.
              </p>
            </div>
          )} */}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlantIdentifier;
