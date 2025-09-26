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
      ur: "Urdu script (اردو Unicode)",
    };
    const targetLanguage = languageMap[language] || "English";

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${yyyy}-${mm}-${dd}`;

    const prompt = `
                    You are an agricultural data assistant.

Generate current-day/present day (today's date) market price records for the following filters:

State: ${state}

District: ${district}

Commodity: ${commodity}

Date: ${formattedDate}

⚠ Output Rules:

Respond strictly in JSON array format only, with no extra text, explanation, or markdown.

All keys MUST remain in English exactly as shown.

All values (except numbers and dates) MUST be translated into ${targetLanguage}.

Dates must remain in YYYY-MM-DD format and reflect today's actual date as per India Time (IST).

Return at least 9 unique market records.

Prices must represent the per quintal value (₹/quintal) and FETCH ACTUAL DATA. DO NOT MANIPULATE ACTUAL PRICE GIVE IT AS IT IS for the given commodity and location. THE PRICES SHOULD BE THAT OF THE CURRENT/PRESENT DAY'S DATE. IF DATA FOR THE PRESENT DAY IS NOT AVAILABLE IT SHOULD SHOW GIVE THE DATA OF THE PREVIOUS DAYS DATE. FALLBACK COULD BE TO ANY OF THE PAST 7 DAYS, BUT IT SHOULD BE THE MOST RECENT ONES. ALSO MAKE SURE ALL THE MARKETS ARE DISTINCT.

Required JSON Structure:

[
  {
    "state": "Translated State",
    "district": "Translated District",
    "market": "Translated Market Name",
    "commodity": "Translated Commodity",
    "variety": "Translated Variety",
    "grade": "A",
    "arrival_date": "YYYY-MM-DD",
    "min_price": <price>,
    "max_price": <price>,
    "modal_price": <price>
  }
]
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
