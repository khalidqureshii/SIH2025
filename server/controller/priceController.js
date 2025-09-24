// import axios from "axios";

// export const getCommodityPrice = async (req, res) => {
//   try {
//     const { state, district, commodity } = req.query;

//     if (!state || !district || !commodity) {
//       return res.status(400).json({
//         error: "Missing required query params: state, district, commodity",
//       });
//     }

//     // API endpoint for Variety-wise Daily Market Prices
//     const url =
//       "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24";

//     const params = {
//       "api-key": process.env.DATA_GOV_API_KEY, // store your key in .env
//       format: "json",
//       limit: 50,
//       "filters[State]": state,
//       "filters[District]": district,
//       "filters[Commodity]": commodity,
//     };

//     const response = await axios.get(url, { params });

//     if (
//       !response.data ||
//       !response.data.records ||
//       response.data.records.length === 0
//     ) {
//       return res.status(404).json({
//         error: "No price data found for given filters",
//       });
//     }

//     // Format the response
//     const results = response.data.records.map((record) => ({
//       state: record.State,
//       district: record.District,
//       market: record.Market,
//       commodity: record.Commodity,
//       variety: record.Variety,
//       grade: record.Grade,
//       arrival_date: record.Arrival_Date,
//       min_price: record.Min_Price,
//       max_price: record.Max_Price,
//       modal_price: record.Modal_Price,
//     }));

//     res.json(results);
//   } catch (err) {
//     console.error("Error fetching commodity price:", err.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
import { GoogleGenerativeAI } from "@google/generative-ai";

export const getCommodityPrice = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    const { state, district, commodity, language } = req.query;

    if (!state || !district || !commodity) {
      return res.status(400).json({
        error: "Missing required query params: state, district, commodity",
      });
    }

    // Map language code to full name for clarity
    const languageMap = {
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
      ur: "Urdu script (اردو Unicode)",
    };
    const targetLanguage = languageMap[language] || "English";

    const prompt = `
You are an agricultural data assistant.

Generate daily market price records for the following filters:
- State: ${state}
- District: ${district}
- Commodity: ${commodity}

⚠ Output rules:
- Respond strictly in JSON array format only, with no extra text or explanation.
- All keys MUST remain in English exactly as shown.
- All values (except numbers and dates) MUST be translated into ${targetLanguage}.
- Dates must remain in YYYY-MM-DD format.
- Return at least 5 records.

Example of required structure:
[
  {
    "state": "ಕರ್ನಾಟಕ",
    "district": "ಮೈಸೂರು",
    "market": "ಮೈಸೂರು ಮಾರುಕಟ್ಟೆ",
    "commodity": "ಈರುಳ್ಳಿ",
    "variety": "ಕೆಂಪು ಈರುಳ್ಳಿ",
    "grade": "A",
    "arrival_date": "2025-09-24",
    "min_price": 1200,
    "max_price": 1800,
    "modal_price": 1500
  }
]
Note: Give me the price of the commodity per quintal
Now generate the JSON for the given inputs. Keep in mind that the data is accurate, and if not close to accurate, but it should be of the present day
`;

    const model = genAI.getGenerativeModel({ model: "gemma-3-27b-it" });
    const result = await model.generateContent(prompt);

    let textResponse = result.response.candidates[0].content.parts[0].text;

    // 🛠 Clean response to strip code fences or extra text
    textResponse = textResponse.trim();
    if (textResponse.startsWith("```")) {
      textResponse = textResponse.replace(/```json|```/g, "").trim();
    }

    let results;
    try {
      results = JSON.parse(textResponse);
    } catch (parseErr) {
      console.error("❌ Failed to parse model response:", textResponse);
      return res.status(500).json({
        error: "Model returned invalid JSON",
        raw: textResponse,
      });
    }

    res.json(results);
  } catch (err) {
    console.error("Error generating commodity price:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
