import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client

export const translateText = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    const { language, content } = req.body;

    if (!language || !content) {
      return res
        .status(400)
        .json({ error: "Both 'language' and 'content' are required" });
    }

    // Build prompt
    const prompt = `Translate the following text into ${language}.
Return only the translated text, no explanations or extra words.

Text: "${content}"`;

    // Call Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // or 2.5 if you want
    const result = await model.generateContent(prompt);
    const translated = result.response.text().trim();

    res.json({
      original: content,
      language,
      translated,
    });
  } catch (error) {
    console.error("Translation error:", error.message);
    res.status(500).json({ error: "Failed to translate text" });
  }
};
