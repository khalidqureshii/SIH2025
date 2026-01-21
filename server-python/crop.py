from IPython.display import Markdown, display # type: ignore
from google import genai
from openai import OpenAI # type: ignore
import os
from dotenv import load_dotenv # type: ignore
import re
import json

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# --- Clients ---
gemini_client = genai.Client(api_key=GEMINI_API_KEY)
openrouter_client = OpenAI(base_url="https://openrouter.ai/api/v1", api_key=OPENROUTER_API_KEY)

# --- Options ---
crop_options = "Wheat, Mustard, Potato, None"

disease_options = """Aphid, Black Rust, Brown Rust, Blast Test, Leaf Blight,
Common Root Rot, Fusarium Head Blight, Mildew, Mite, Septoria, Smut, Stem Fly, Tan Spot, Yellow Rust, None"""

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
    "kok": "Konkani script (Devanagari)",
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

def analyze_disease(img_bytes, mime_type, language):
    language = languages.get(language)
    prompt = f"""
        You are an agricultural expert. Identify the crop and disease in this image. Ignore watermarks or any text at corners.

        Crops: Could be any crop.
        Diseases: {disease_options}

        Return ONLY valid JSON in this exact format, in ONE SINGLE LINE (no line breaks, no markdown, no extra text):
        {{"crop": "<name>", "disease": "<name>", "causes": ["cause1", "cause2", ..., "causeN"], "recommendations": ["rec1", "rec2", ..., "recN"]}}

        Give atleast 3 causes & 3 recommendations. But you could go upto 7 causes & 7 recommendations. The more the better.

        If the user enters the picture of something other than crops, return the following translated in {language} language: 
        {{"crop": "None", "disease": "None", "causes": ["Error, the image you provided is not a crop"], "recommendations": ["Error, the image you provided is not a crop"]}}

        I want you to give the crop name as: "<name in {language}> (name in English)" if the {language} is not English.
        I want you to give the disease name as: "<name in {language}> (name in English)" if the {language} is not English.
        I want you to give the causes and recommendations in {language} language.
    """

    response = gemini_client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[{
            "role": "user",
            "parts": [{"text": prompt}, {"inline_data": {"mime_type": mime_type, "data": img_bytes}}]
        }]
    )
    raw_text = response.text.strip()

    # --- Step 1: Strip markdown fences if present ---
    cleaned_text = re.sub(r"^```(?:json)?|```$", "", raw_text, flags=re.MULTILINE).strip()

    # --- Step 2: Remove line breaks ---
    cleaned_text = cleaned_text.replace("\n", "").replace("\r", "").strip()

    # --- Step 3: Extract JSON object if extra text sneaks in ---
    match = re.search(r"\{.*\}", cleaned_text)
    if not match:
        raise ValueError(f"Invalid response format: {raw_text}")
    
    json_str = match.group(0)

    # --- Step 4: Parse JSON safely ---
    try:
        result = json.loads(json_str)
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse JSON: {json_str}") from e

    return result


def identify_crop(img_bytes, mime_type, language):
    language = languages.get(language)
    prompt = f"""
        You are an agricultural expert. Identify the crop in this image. Ignore watermarks or any text at corners.

        Return ONLY valid JSON in this exact format, in ONE SINGLE LINE (no line breaks, no markdown, no extra text):
        {{"crop": "<name>"}}

        If the user enters the picture of something other than crops, return the following translated in {language} language: 
        {{"crop": "None",}}

        I want you to give the crop name as: "<name in {language}> (name in English)" if the {language} is not English.
    """

    response = gemini_client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[{
            "role": "user",
            "parts": [{"text": prompt}, {"inline_data": {"mime_type": mime_type, "data": img_bytes}}]
        }]
    )
    raw_text = response.text.strip()

    # --- Step 1: Strip markdown fences if present ---
    cleaned_text = re.sub(r"^```(?:json)?|```$", "", raw_text, flags=re.MULTILINE).strip()

    # --- Step 2: Remove line breaks ---
    cleaned_text = cleaned_text.replace("\n", "").replace("\r", "").strip()

    # --- Step 3: Extract JSON object if extra text sneaks in ---
    match = re.search(r"\{.*\}", cleaned_text)
    if not match:
        raise ValueError(f"Invalid response format: {raw_text}")
    
    json_str = match.group(0)

    # --- Step 4: Parse JSON safely ---
    try:
        result = json.loads(json_str)
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse JSON: {json_str}") from e

    return result

