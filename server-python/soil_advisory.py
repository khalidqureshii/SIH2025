import os
import json
import logging
from typing import Dict, Any
from fastapi import HTTPException  # type: ignore
from pydantic import BaseModel     # type: ignore
from google import genai

# Init Gemini client (requires GEMINI_API_KEY in env)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY environment variable not set")
client = genai.Client(api_key=GEMINI_API_KEY)


languages = {
    "as": "Assamese script (অসমীয়া Unicode)",
    "bn": "Bengali script (বাংলা Unicode)",
    "brx": "Bodo script (Bodo Devanagari Unicode)",
    "doi": "Dogri script (देवनागरी Unicode)",
    "en": "English",
    "gu": "Gujarati script (ગુજરાતી Unicode)",
    "hi": "Hindi script (देवनागरी Unicode)",
    "kn": "Kannada script (ಕನ್ನಡ Unicode)",
    "ks": "Kashmiri script (Kashmiri Unicode)",
    "kok": "Konkani script (Devanagari Unicode)",
    "mai": "Maithili script (देवनागरी Unicode)",
    "ml": "Malayalam script (മലയാളം Unicode)",
    "mni": "Manipuri (Meitei) script (Meitei Mayek Unicode)",
    "mr": "Marathi script (देवनागरी Unicode)",
    "ne": "Nepali script (देवनागरी Unicode)",
    "or": "Odia script (ଓଡ଼ିଆ Unicode)",
    "pa": "Punjabi script (ਪੰਜਾਬੀ Unicode / Gurmukhi)",
    "sa": "Sanskrit script (देवनागरी Unicode)",
    "sat": "Santali script (Latin Unicode)",
    "sd": "Sindhi script (سنڌي Unicode / Arabic or Devanagari)",
    "ta": "Tamil script (தமிழ் Unicode)",
    "te": "Telugu script (తెలుగు Unicode)",
    "ur": "Urdu script (اردو Unicode)"
}

# ----------------- Pydantic model -----------------
class SensorAnalyzeRequest(BaseModel):
    farmSize: float
    humidity: float
    k: float
    n: float
    p: float
    pH: float
    rainfall: float
    soilMoisture: float
    temperature: float
    latitude: float
    longitude: float
    waterSource: str
    farmSize: float
    language: str 


# ----------------- System prompt -----------------
# SYSTEM_PROMPT = (
#     "You are an expert agricultural advisor with deep knowledge of local Indian cropping systems. "
#     "Given sensor readings + location + farm details, suggest up to **3 crops** well-suited to the region and current or upcoming season. "
#     "For each crop, mention when to plant, what fertilizers to use (general classes, not brand names), which types of pesticides/controls might be needed, and key diseases or pests to watch out for. "
#     "Also include soil health tips. "
#     "Respond purely with advisory text (you may use bullet lists or paragraphs, separate paragraphs by empty lines) — do not wrap it in JSON or extra structure."
# )

# SYSTEM_PROMPT = (
#     "You are an expert agricultural advisor with deep knowledge of local cropping systems. "
#     "Given the farm location, season, sensor readings, and details, suggest up to 3 suitable crops. "
#     "For each crop, provide advice on: when to plant, fertilizers to use (general classes only), "
#     "pesticides or controls needed (general categories, not brand names), and key diseases/pests to watch out for. "
#     "Also include soil health tips where relevant. "

#     "Format the response as follows:\n"
#     "- Start with a short introduction about the location/season context.\n"
#     "- For each crop, use a clear header like '### Crop 1: Paddy (Rice)'.\n"
#     "- Separate each crop section with at least 2 blank lines.\n"
#     "- Use bullet points for fertilizers, pesticides, and disease/pest watchouts.\n"

#     "Respond only with advisory text in this format (no JSON, no markdown fences)."
# )



# ----------------- Core logic -----------------
async def analyze_sensor_data(payload: SensorAnalyzeRequest):
    raw = payload.dict()
    lang = languages.get(raw['language'], "English")

    SYSTEM_PROMPT = f"""You are an expert agricultural advisor. "
    Given the farm's location, season, and sensor details, suggest up to 3 crops. 
    For each crop, include: when to plant, fertilizers (general classes), pesticides/controls, 
    key diseases/pests, and soil health tips. 

    Format your response in clean Markdown:\\n
    - No introductory paragraph.
    - Use headers like '### Crop 1: Paddy (Rice)'.
    - Leave at least one blank lines before each crop header. use only \\n, no <br> should be visible in the response.
    - Use bullet points for fertilizers, pesticides, and watchouts.
    - Include fertilizer/pesticide dosages per acre if possible (even a range is fine).
    - Ensure proper spacing so the Markdown renders cleanly.
    - Try to use as less technical jargon as possible, and if you do use any, explain it in simple terms in () after the term. Frame it so that anyone can understand it.

    Respond only in {lang}."""

    logging.info("Received sensor-analyze request")

    # --- Build conversation (straightforward, no filtering) ---
    sensor_data = raw.get("sensorData", {})
    conversation_lines = ["Sensor readings:"]
    for k, v in sensor_data.items():
        conversation_lines.append(f"- {k}: {v}")

    conversation_lines.append(f"latitude: {raw['latitude']}")
    conversation_lines.append(f"longitude: {raw['longitude']}")
    conversation_lines.append(f"waterSource: {raw['waterSource']}")
    conversation_lines.append(f"farmSize: {raw['farmSize']}")
    conversation = "\n".join(conversation_lines)

    try:
        model_input = SYSTEM_PROMPT + "\n\nSensor Readings:\n" + conversation
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=model_input,
        )

        # --- Extract text only ---
        if hasattr(response, "text") and callable(response.text):
            advice_text = response.text()
        elif hasattr(response, "candidates"):
            advice_text = response.candidates[0].content.parts[0].text
        else:
            advice_text = str(response)

        return {"advice": advice_text}

    except Exception as e:
        logging.exception("Error calling Gemini model")
        raise HTTPException(status_code=500, detail=f"Model request failed: {e}")