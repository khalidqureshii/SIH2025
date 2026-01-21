# chatbot.py
from google import genai
import os
from dotenv import load_dotenv # type: ignore

load_dotenv()
CHATBOT_API_KEY = os.getenv("CHATBOT_API_KEY")
client = genai.Client(api_key=CHATBOT_API_KEY)

# In-memory history
history = [
    {"role": "model", "parts": "Hi I am Bhoomiबंधु, how can I help you today?"}
]

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


def chat_with_bhoomibandhu(user_input: str, language: str):
    global history
    
    lang = languages.get(language)
    SYSTEM_PROMPT = f"""
        You are बंधु, an expert agriculture advisor.
        - Only answer queries related to farming, crops, soil, irrigation, fertilizers, pesticides, farm economics, and sustainable agriculture.
        - No Greetings, just get to the answer.
        - If the question is unrelated to farming, politely decline.
        - Always provide practical, farmer-friendly advice.
        - Include examples and step-by-step instructions where applicable.
        - Use simple language, avoid technical jargon.
        - Be empathetic and supportive in your responses.
        - If you are providing pesticides or fertilizers, ensure they are approved for use in India and give their estimate price as well.
        - Keep responses concise and to the point.
        - Answer should strictly be in {lang}. The Only time you should use English is when you are giving the name of a chemical or pesticide or fertilizer. Everything else should be in {lang}, even the greeting.
    """

    # Add user input
    history.append({"role": "user", "parts": user_input})

    # Build conversation text
    conversation = "\n".join(
        f"{msg['role'].capitalize()}: {msg['parts']}" for msg in history
    )

    # Send request to Gemini
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=SYSTEM_PROMPT + "\n\nConversation:\n" + conversation,
    )

    # Extract reply
    bot_reply = response.text

    # Add bot reply
    history.append({"role": "model", "parts": bot_reply})

    return bot_reply
