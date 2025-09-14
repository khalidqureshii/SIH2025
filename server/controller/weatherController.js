// ## Gemini Final


// import axios from "axios";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const languageScripts = {
//   as: "Assamese script (অসমীয়া Unicode)",
//   bn: "Bengali script (বাংলা Unicode)",
//   brx: "Bodo script (Roman/Bodo Unicode if available)",
//   doi: "Dogri script (देवनागरी Unicode)",
//   gu: "Gujarati script (ગુજરાતી Unicode)",
//   hi: "Hindi script (देवनागरी Unicode)",
//   kn: "Kannada script (ಕನ್ನಡ Unicode)",
//   ks: "Kashmiri script (कश्मीरी Unicode)",
//   kok: "Konkani script (Devanagari or Latin Unicode)",
//   mai: "Maithili script (देवनागरी Unicode)",
//   ml: "Malayalam script (മലയാളം Unicode)",
//   mni: "Manipuri (Meitei) script (Meitei Mayek Unicode)",
//   mr: "Marathi script (देवनागरी Unicode)",
//   ne: "Nepali script (देवनागरी Unicode)",
//   or: "Odia script (ଓଡ଼ିଆ Unicode)",
//   pa: "Punjabi script (ਪੰਜਾਬੀ Unicode / Gurmukhi)",
//   sa: "Sanskrit script (देवनागरी Unicode)",
//   sat: "Santali script (Ol Chiki Unicode)",
//   sd: "Sindhi script (سنڌي Unicode / Arabic or Devanagari)",
//   ta: "Tamil script (தமிழ் Unicode)",
//   te: "Telugu script (తెలుగు Unicode)",
//   ur: "Urdu script (اردو Unicode)",
// };

// export const getWeatherAdvisory = async (req, res) => {
//   try {
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

//     const { q, lat, lon, lang } = req.query;
//     const query = q ? q : `${lat},${lon}`;
//     const language = lang || "en"; // default English
//     const scriptInfo = languageScripts[language] || language;

//     // --- Fetch weather forecast in target language ---
//     const url = `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${query}&days=7&aqi=no&alerts=yes&lang=${language}`;
//     const response = await axios.get(url);
//     const data = response.data;

//     console.log(data);

//     // --- Prepare forecast summary for AI ---
//     const forecastSummary = data.forecast.forecastday
//       .map((day) => {
//         const { maxtemp_c, mintemp_c, avgtemp_c, daily_chance_of_rain, condition } = day.day;
//         return `Date: ${day.date}  
//         Max Temp: ${maxtemp_c}°C | Min Temp: ${mintemp_c}°C | Avg Temp: ${avgtemp_c}°C  
//         Rain Chance: ${daily_chance_of_rain}% | Condition: ${condition.text}`;
//       })
//       .join("\n\n");

//       // console.log(forecastSummary);

//     // --- Build strict AI prompt ---
//     const prompt = `
//                     You are a farming advisor. Provide advice in ${language} using ${scriptInfo}. 
//                     Do NOT use Roman characters or any other script.

//                     Provide a JSON array with the following structure:
//                     [
//                       { "date": "<ISO date in YYYY-MM-DD format>", "advice": "<short, actionable farming advice in ${language}, 1-2 lines>" }
//                     ]

//                     Use the following 7-day weather forecast for reference:
//                     ${forecastSummary}

//                     Only output valid JSON. Do not include greetings, explanations, or any text outside the JSON array.
//                   `;

//     let validAdvisory = [];

//     try {
//       // --- Call Gemini AI ---
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//       const result = await model.generateContent(prompt);
//       let aiText = result.response.text();

//       // --- Clean AI output ---
//       aiText = aiText.replace(/```json|```/g, "").trim();

//       // --- Parse JSON safely ---
//       let parsedAdvisory = [];
//       try {
//         parsedAdvisory = JSON.parse(aiText);
//       } catch (err) {
//         console.error("Failed to parse AI response:", err.message);
//       }

//       // --- Validate & sanitize ---
//       validAdvisory = Array.isArray(parsedAdvisory)
//         ? parsedAdvisory
//             .filter(
//               (item) =>
//                 typeof item === "object" &&
//                 item !== null &&
//                 typeof item.date === "string" &&
//                 typeof item.advice === "string"
//             )
//             .map((item) => ({
//               date: item.date.trim(),
//               advice: item.advice.trim(),
//             }))
//         : [];
//     } catch (err) {
//       console.error("Gemini AI error:", err.message);
//     }

//     // --- Send API response ---
//     res.json({
//       location: data.location,
//       forecast: data.forecast.forecastday,
//       advisory_from_ai: validAdvisory,
//     });
//   } catch (error) {
//     console.error("Error fetching weather or advisory:", error.message);
//     res.status(500).json({ error: "Failed to fetch weather or advisory" });
//   }
// };


// ## Gemma Final

import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const languageScripts = {
  as: "Assamese script (অসমীয়া Unicode)",
  bn: "Bengali script (বাংলা Unicode)",
  brx: "Bodo script (Bodo Devanagari Unicode)",
  doi: "Dogri script (देवनागरी Unicode)",
  gu: "Gujarati script (ગુજરાતી Unicode)",
  hi: "Hindi script (देवनागरी Unicode)",
  kn: "Kannada script (ಕನ್ನಡ Unicode)",
  ks: "Kashmiri script (Kashmiri Unicode)",
  kok: "Konkani script (Devanagari or Latin Unicode)",
  mai: "Maithili script (देवनागरी Unicode)",
  ml: "Malayalam script (മലയാളം Unicode)",
  mni: "Manipuri (Meitei) script (Meitei Mayek Unicode)",
  mr: "Marathi script (देवनागरी Unicode)",
  ne: "Nepali script (देवनागरी Unicode)",
  or: "Odia script (ଓଡ଼ିଆ Unicode)",
  pa: "Punjabi script (ਪੰਜਾਬੀ Unicode / Gurmukhi)",
  sa: "Sanskrit script (देवनागरी Unicode)",
  sat: "Santali script (Latin Unicode)",
  sd: "Sindhi script (سنڌي Unicode / Arabic or Devanagari)",
  ta: "Tamil script (தமிழ் Unicode)",
  te: "Telugu script (తెలుగు Unicode)",
  ur: "Urdu script (اردو Unicode)",
};

export const getWeatherAdvisory = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

    const { q, lat, lon, lang } = req.query;
    const query = q ? q : `${lat},${lon}`;
    const language = lang || "en";
    const scriptInfo = languageScripts[language] || language;

    const url = `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${query}&days=7&aqi=no&alerts=yes&lang=${language}`;
    const response = await axios.get(url);
    const data = response.data;

    const forecastSummary = data.forecast.forecastday
      .map((day) => {
        const {
          maxtemp_c,
          mintemp_c,
          avgtemp_c,
          daily_chance_of_rain,
          condition,
        } = day.day;
        return `Date: ${day.date}  
        Max Temp: ${maxtemp_c}°C | Min Temp: ${mintemp_c}°C | Avg Temp: ${avgtemp_c}°C  
        Rain Chance: ${daily_chance_of_rain}% | Condition: ${condition.text}`;
      })
      .join("\n\n");

    // const prompt = `
    //   You are a farming advisor. Provide advice in ${language} using ${scriptInfo}. 
    //   Do NOT use Roman characters or any other script.

    //   Provide a JSON array with the following structure:
    //   [
    //     { "date": "<ISO date in YYYY-MM-DD format>", "advice": "<short, actionable farming advice in ${language}, 1-2 lines>" }
    //   ]

    //   Use the following 7-day weather forecast for reference:
    //   ${forecastSummary}

    //   Only output valid JSON. Do not include greetings, explanations, or any text outside the JSON array.
    // `;

    const prompt = `
                    You are a farming advisor. Provide advice in ${language} using ${scriptInfo}. 

                    ⚠️ STRICT RULES:
                    - Do NOT use Roman characters, English letters, or transliterations (e.g., Hinglish).
                    - Only use ${scriptInfo} for text. 
                    - Do NOT include parentheses, phonetic spellings, or any text outside the specified script.
                    - The output must be a valid JSON array only.

                    Format:
                    [
                      { "date": "<ISO date in YYYY-MM-DD format>", "advice": "<short, actionable farming advice in ${language}, 1-2 lines>" }
                    ]

                    Here is the 7-day weather forecast for reference:
                    ${forecastSummary}

                    Only output valid JSON. No explanations, no greetings, no extra text.
                  `;

    let validAdvisory = [];

    try {
      const model = genAI.getGenerativeModel({ model: "gemma-3-27b-it" });
      const result = await model.generateContent(prompt);
      let aiText = result.response.text();

      aiText = aiText.replace(/```json|```/g, "").trim();

      let parsedAdvisory = [];
      try {
        parsedAdvisory = JSON.parse(aiText);
      } catch (err) {
        console.error("Failed to parse AI response:", err.message);
      }

      validAdvisory = Array.isArray(parsedAdvisory)
        ? parsedAdvisory
            .filter(
              (item) =>
                typeof item === "object" &&
                item !== null &&
                typeof item.date === "string" &&
                typeof item.advice === "string"
            )
            .map((item) => ({
              date: item.date.trim(),
              advice: item.advice.trim(),
            }))
        : [];
    } catch (err) {
      console.error("Gemma AI error:", err.message);
    }

    res.json({
      location: data.location,
      forecast: data.forecast.forecastday,
      advisory_from_ai: validAdvisory,
    });
  } catch (error) {
    console.error("Error fetching weather or advisory:", error.message);
    res.status(500).json({ error: "Failed to fetch weather or advisory" });
  }
};