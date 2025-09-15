import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { use } from "i18next";
import { Loader2, Upload, Volume2, Leaf } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LINK2 } from "@/store/Link";

const useVoices = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const voicesList = window.speechSynthesis.getVoices();
      setVoices(voicesList);
      console.log("Available voices:");
      voicesList.forEach((v, i) =>
        console.log(`${i + 1}. ${v.name} — ${v.lang}`)
      );
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  return voices;
};

type DetectionResult = {
  crop: string;
  disease: string;
  causes: any;
  recommendations: any;
  voiceUrl?: string | null;
};

const DiseaseDetectionPage = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

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
      console.log("Submitting image for with language:", lang);

      //POST request code :
      const res = await fetch(`${LINK2}/analyze-crops`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image!");
      }

      const data = await res.json();
      // const { crop, disease } = data.result;

      setResult({
        crop: data.result.crop,
        disease: data.result.disease,
        causes: data.result.causes,
        recommendations: data.result.recommendations,
        voiceUrl: null,
      });
    } catch (e) {
      console.log("Error while uploading the file", e);
      alert(t("disease_page.errors.alertDetectionFailed"));
    } finally {
      setLoading(false);
    }
  };

  //   const playVoice = () => {
  //     if (result?.voiceUrl) {
  //       const audio = new Audio(result.voiceUrl);
  //       audio.play();
  //     }
  //   };

  const voices = useVoices(); // ✅ safe now

  const speakText = (text: string, lang = "en-IN") => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const selectedVoice = voices.find((v) => v.lang === lang);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.lang = lang;
      utterance.rate = 1;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-6 ">
      {/* Header */}

      {/* Card */}
      <Card
        className={`w-full ${
          result ? "max-w-5xl" : "max-w-md"
        }  shadow-lg rounded-2xl border border-white/20 
        bg-white/30 backdrop-blur-md transition-all duration-500 m-7`}
      >
        <div className="flex flex-col items-center pt-4">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-600" />{" "}
            {t("disease_page.header.title")}
          </h1>
          <p className=" mb-6 text-center max-w-md">
            {t("disease_page.header.description")}
          </p>
        </div>
        <CardContent className="p-6 flex flex-col items-center gap-6">
          {/* Upload & Preview section (as you have) */}
          {/* Upload Section */}{" "}
          {!preview && (
            <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-green-400 bg-yellow-50 p-8 rounded-xl w-full hover:bg-yellow-100 transition">
              {" "}
              <Upload className="h-12 w-12 mb-3 text-green-600" />{" "}
              <p className="text-sm text-gray-600 font-medium">
                {" "}
                {t("disease_page.uploadSection.tapToUpload")}{" "}
              </p>{" "}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />{" "}
            </label>
          )}{" "}
          {/* Preview Section */}{" "}
          {preview && (
            <div className="flex flex-col items-center gap-4 w-full">
              {" "}
              <img
                src={preview}
                alt={t("disease_page.previewSection.altPreview")}
                className="w-56 h-56 object-cover rounded-xl border-2 border-green-300 shadow-md"
              />{" "}
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-56 bg-green-600 hover:bg-green-700 text-white"
              >
                {" "}
                {loading ? (
                  <>
                    {" "}
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />{" "}
                    {t("disease_page.previewSection.analyzing")}{" "}
                  </>
                ) : (
                  t("disease_page.previewSection.detectDisease")
                )}{" "}
              </Button>{" "}
            </div>
          )}
          {/* Result Section */}
          {result && !loading && (
            <div className="mt-4 w-full text-center bg-green-50 border rounded-xl border-green-200 p-4 shadow-inner">
              <h2 className="text-xl font-bold text-green-800 mb-2">
                {result.crop}
              </h2>
              <p className="text-red-600 font-semibold text-lg mb-4">
                {t("disease_page.resultSection.diseaseLabel")} {result.disease}
              </p>

              {/* Causes + Recommendations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-[400px] overflow-y-auto pr-2">
                {result.causes && (
                  <div className="bg-white/60 backdrop-blur-md rounded-lg p-5 shadow">
                    <h3 className="text-lg font-semibold text-green-700 mb-3">
                      {t("disease_page.resultSection.causesTitle")}
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 leading-6">
                      {result.causes.map((cause: any, i: number) => (
                        <li key={i}>{cause}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.recommendations && (
                  <div className="bg-white/60 backdrop-blur-md rounded-lg p-5 shadow">
                    <h3 className="text-lg font-semibold text-green-700 mb-3">
                      {t("disease_page.resultSection.recommendationsTitle")}
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 leading-6">
                      {result.recommendations.map((rec: any, i: number) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Button
                onClick={() => {
                  speakText(result.causes, "hi-IN");
                  speakText(result.recommendations, "hi-IN");
                }}
                variant="outline"
                className="mt-6 border-green-600 text-green-700 hover:bg-green-100"
              >
                <Volume2 className="h-5 w-5 mr-2" />{" "}
                {t("disease_page.resultSection.listenToAdvice")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DiseaseDetectionPage;

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// // import { use } from "i18next";
// import { Loader2, Upload, Volume2, Leaf } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { LINK2 } from "@/store/Link";

// const useVoices = () => {
//   const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

//   useEffect(() => {
//     const loadVoices = () => {
//       const voicesList = window.speechSynthesis.getVoices();
//       setVoices(voicesList);
//       console.log("Available voices:");
//       voicesList.forEach((v, i) =>
//         console.log(`${i + 1}. ${v.name} — ${v.lang}`)
//       );
//     };

//     loadVoices();
//     window.speechSynthesis.onvoiceschanged = loadVoices;
//   }, []);

//   return voices;
// };

// type DetectionResult = {
//   crop: string;
//   disease: string;
//   causes: any;
//   recommendations: any;
//   voiceUrl?: string | null;
// };

// const DiseaseDetectionPage = () => {
//   const { t, i18n } = useTranslation();
//   const lang = i18n.language;
//   const [image, setImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<DetectionResult | null>(null);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//       setResult(null);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!image) return;
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", image);
//       formData.append("language", lang);
//       console.log("Submitting image for with language:", lang);

//       //POST request code :
//       const res = await fetch(`${LINK2}/analyze-crops`, {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         throw new Error("Failed to upload image!");
//       }

//       const data = await res.json();
//       // const { crop, disease } = data.result;

//       setResult({
//         crop: data.result.crop,
//         disease: data.result.disease,
//         causes: data.result.causes,
//         recommendations: data.result.recommendations,
//         voiceUrl: null,
//       });
//     } catch (e) {
//       console.log("Error while uploading the file", e);
//       alert(t("disease_page.errors.alertDetectionFailed"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   //   const playVoice = () => {
//   //     if (result?.voiceUrl) {
//   //       const audio = new Audio(result.voiceUrl);
//   //       audio.play();
//   //     }
//   //   };

//   const voices = useVoices(); // ✅ safe now

//   const speakText = (text: string, lang = "en-IN") => {
//     if ("speechSynthesis" in window) {
//       const utterance = new SpeechSynthesisUtterance(text);
//       const selectedVoice = voices.find((v) => v.lang === lang);
//       if (selectedVoice) {
//         utterance.voice = selectedVoice;
//       }
//       utterance.lang = lang;
//       utterance.rate = 1;
//       utterance.pitch = 1;
//       speechSynthesis.speak(utterance);
//     } else {
//       alert("Sorry, your browser does not support text-to-speech.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center p-6">
//       {/* Header */}

//       {/* Card */}
//       <Card
//         className={`w-full ${
//           result ? "max-w-5xl" : "max-w-md"
//         }  shadow-lg rounded-2xl border border-white/20 
//         bg-white/30 backdrop-blur-md transition-all duration-500`}
//       >
//         <div className="flex flex-col items-center pt-4">
//           <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
//             <Leaf className="w-8 h-8 text-green-600" />{" "}
//             {t("disease_page.header.title")}
//           </h1>
//           <p className=" mb-6 text-center max-w-md">
//             {t("disease_page.header.description")}
//           </p>
//         </div>
//         <CardContent className="flex flex-col items-center gap-6 p-6">
//           {/* Upload & Preview section (as you have) */}
//           {/* Upload Section */}{" "}
//           {!preview && (
//             <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-green-400 bg-yellow-50 p-8 rounded-xl w-full hover:bg-yellow-100 transition">
//               {" "}
//               <Upload className="h-12 w-12 mb-3 text-green-600" />{" "}
//               <p className="text-sm text-gray-600 font-medium">
//                 {" "}
//                 {t("disease_page.uploadSection.tapToUpload")}{" "}
//               </p>{" "}
//               <input
//                 type="file"
//                 accept="image/*"
//                 capture="environment"
//                 className="hidden"
//                 onChange={handleImageUpload}
//               />{" "}
//             </label>
//           )}{" "}
//           {/* Preview Section */}{" "}
//           {preview && (
//             <div className="flex flex-col items-center gap-4 w-full">
//               {" "}
//               <img
//                 src={preview}
//                 alt={t("disease_page.previewSection.altPreview")}
//                 className="w-56 h-56 object-cover rounded-xl border-2 border-green-300 shadow-md"
//               />{" "}
//               <Button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="w-56 bg-green-600 hover:bg-green-700 text-white"
//               >
//                 {" "}
//                 {loading ? (
//                   <>
//                     {" "}
//                     <Loader2 className="h-5 w-5 animate-spin mr-2" />{" "}
//                     {t("disease_page.previewSection.analyzing")}{" "}
//                   </>
//                 ) : (
//                   t("disease_page.previewSection.detectDisease")
//                 )}{" "}
//               </Button>{" "}
//             </div>
//           )}
//           {/* Result Section */}
//           {result && !loading && (
//             <div className="mt-4 w-full text-center bg-green-50 border border-green-200 rounded-xl p-4 shadow-inner">
//               <h2 className="text-xl font-bold text-green-800 mb-2">
//                 {result.crop}
//               </h2>
//               <p className="text-red-600 font-semibold text-lg mb-4">
//                 {t("disease_page.resultSection.diseaseLabel")} {result.disease}
//               </p>

//               {/* Causes + Recommendations */}
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-[400px] overflow-y-auto pr-2">
//                 {result.causes && (
//                   <div className="bg-white/60 backdrop-blur-md rounded-lg p-5 shadow">
//                     <h3 className="text-lg font-semibold text-green-700 mb-3">
//                       {t("disease_page.resultSection.causesTitle")}
//                     </h3>
//                     <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 leading-6">
//                       {result.causes.map((cause: any, i: number) => (
//                         <li key={i}>{cause}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 {result.recommendations && (
//                   <div className="bg-white/60 backdrop-blur-md rounded-lg p-5 shadow">
//                     <h3 className="text-lg font-semibold text-green-700 mb-3">
//                       {t("disease_page.resultSection.recommendationsTitle")}
//                     </h3>
//                     <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 leading-6">
//                       {result.recommendations.map((rec: any, i: number) => (
//                         <li key={i}>{rec}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>

//               <Button
//                 onClick={() => {
//                   speakText(result.causes, "hi-IN");
//                   speakText(result.recommendations, "hi-IN");
//                 }}
//                 variant="outline"
//                 className="mt-6 border-green-600 text-green-700 hover:bg-green-100"
//               >
//                 <Volume2 className="h-5 w-5 mr-2" />{" "}
//                 {t("disease_page.resultSection.listenToAdvice")}
//               </Button>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default DiseaseDetectionPage;
