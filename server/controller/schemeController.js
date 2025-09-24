// import { GoogleGenerativeAI } from "@google/generative-ai";
// import axios from "axios";

// export const getSchemesByState = async (req, res) => {
//   try {
//     const state = req.query.state || "All";
//     const language = req.query.language || "en";

//     // Fetch schemes
//     const url = `https://api.myscheme.gov.in/search/v5/schemes?lang=en&q=%5B%7B%22identifier%22%3A%22beneficiaryState%22%2C%22value%22%3A%22All%22%7D%2C%7B%22identifier%22%3A%22beneficiaryState%22%2C%22value%22%3A%22${state}%22%7D%2C%7B%22identifier%22%3A%22schemeCategory%22%2C%22value%22%3A%22Agriculture%2CRural%20%26%20Environment%22%7D%5D&keyword=&sort=&from=0&size=10`;

//     const apiResponse = await axios.get(url, {
//       headers: {
//         Accept: "application/json",
//         "X-Api-Key": process.env.MYSCHEME_API_KEY,
//         Origin: "https://www.myscheme.gov.in",
//       },
//     });

//     // Extract only the fields you show in UI
//     let schemes =
//       apiResponse.data?.data?.hits?.items?.map((item) => {
//         const f = item.fields;
//         return {
//           schemeLevel: f.level,
//           schemeName: f.schemeName,
//           briefDescription: f.briefDescription,
//           tags: f.tags,
//           schemeFor: f.schemeFor,
//           nodalMinistryName: f.nodalMinistryName,
//           beneficiaryStates: f.beneficiaryState,
//         };
//       }) || [];

//     // Translate if needed
//     if (language !== "en" && schemes.length > 0) {
//       const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//       const prompt = `
// Translate the following JSON into ${language}.
// Keep the structure the same.
// Translate only the values of schemeLevel, schemeName, briefDescription, tags, schemeFor, nodalMinistryName, and beneficiaryStates.
// Do not translate the keys.

// JSON:
// ${JSON.stringify(schemes, null, 2)}
//   `;

//       const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
//       const result = await model.generateContent(prompt);
//       const translated = result.response.text().trim();

//       try {
//         const cleanText = translated
//           .replace(/```json/g, "")
//           .replace(/```/g, "")
//           .trim();

//         schemes = JSON.parse(cleanText);
//       } catch (e) {
//         console.error("Failed to parse translated JSON:", e.message);
//       }
//     }

//     res.status(200).json({
//       status: "Success",
//       total: schemes.length,
//       schemes,
//     });
//   } catch (error) {
//     if (error.response) {
//       res.status(error.response.status).json({
//         error: "Failed to fetch schemes",
//         details: error.response.data,
//       });
//     } else {
//       res.status(500).json({ error: "Failed to fetch schemes" });
//     }
//   }
// };

import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

export const getSchemesByState = async (req, res) => {
  try {
    const state = req.query.state || "All";
    const language = req.query.language || "en";
    console.log(state, language);
    // 🔹 External API URL
    const url = `https://api.myscheme.gov.in/search/v5/schemes?lang=en&q=%5B%7B%22identifier%22%3A%22beneficiaryState%22%2C%22value%22%3A%22All%22%7D%2C%7B%22identifier%22%3A%22beneficiaryState%22%2C%22value%22%3A%22${state}%22%7D%2C%7B%22identifier%22%3A%22schemeCategory%22%2C%22value%22%3A%22Agriculture%2CRural%20%26%20Environment%22%7D%5D&keyword=&sort=&from=0&size=10`;

    const apiResponse = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "X-Api-Key": process.env.MYSCHEME_API_KEY,
        Origin: "https://www.myscheme.gov.in",
      },
    });

    // 🔹 Extract **all fields your frontend expects**
    let schemes =
      apiResponse.data?.data?.hits?.items?.map((item) => {
        const f = item.fields || {};
        return {
          beneficiaryState: Array.isArray(f.beneficiaryState)
            ? f.beneficiaryState
            : [],
          beneficiaryStateName: f.beneficiaryStateName || "Not specified",
          schemeShortTitle: f.schemeShortTitle || f.schemeName || "",
          level: f.level || "",
          schemeFor: f.schemeFor || "",
          nodalMinistryName: f.nodalMinistryName || "",
          schemeCategory: Array.isArray(f.schemeCategory)
            ? f.schemeCategory
            : ["General"],
          schemeName: f.schemeName || "",
          briefDescription: f.briefDescription || "No description available.",
          tags: Array.isArray(f.tags) ? f.tags : [],
          slug: f.slug || "",
          deadline: f.deadline
            ? new Date(f.deadline).toISOString().split("T")[0]
            : null,
        };
      }) || [];

    // 🔹 Translate if not English
    if (language !== "en" && schemes.length > 0) {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

      const prompt = `
Translate the following JSON into ${language}.
Keep the structure and keys the same.
Translate only the values of:
beneficiaryState, beneficiaryStateName, schemeShortTitle, level, schemeFor, nodalMinistryName,
schemeCategory, schemeName, briefDescription, tags, slug, deadline.

JSON:
${JSON.stringify(schemes, null, 2)}
      `;

      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(prompt);
      const translated = result.response.text().trim();

      try {
        const cleanText = translated
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        schemes = JSON.parse(cleanText);
      } catch (e) {
        console.error("Failed to parse translated JSON:", e.message);
      }
    }

    // 🔹 Send final response
    res.status(200).json({
      status: "Success",
      total: schemes.length,
      schemes,
    });
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({
        error: "Failed to fetch schemes",
        details: error.response.data,
      });
    } else {
      res.status(500).json({ error: "Failed to fetch schemes" });
    }
  }
};
