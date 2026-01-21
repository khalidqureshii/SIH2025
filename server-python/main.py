from typing import Optional, Dict, Any
import json
import logging
import uvicorn  # type: ignore
from fastapi import FastAPI, File, Form, UploadFile, HTTPException, Query  # type: ignore
from fastapi.middleware.cors import CORSMiddleware  # type: ignore
from fastapi.responses import JSONResponse  # type: ignore
from pydantic import BaseModel  # type: ignore
from google import genai
from typing import Optional, Dict, Any
import logging
import json
from chatbot import chat_with_bhoomibandhu
from crop import analyze_disease, identify_crop
from crop_advisory import CropAdvisorySystem
from soil_advisory import analyze_sensor_data, SensorAnalyzeRequest

app = FastAPI(title="Crop Disease Detection API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
# Global system instance
advisory_system = None


def initialize_system():
    global advisory_system
    try:
        advisory_system = CropAdvisorySystem()
        result = advisory_system.initialize_system()
        return result is not None
    except Exception as e:
        print(f"Failed to initialize system: {e}")
        return False


@app.on_event("startup")
async def startup_event():
    print("Initializing Crop Advisory System...")
    success = initialize_system()
    if success:
        print("System initialized successfully")
    else:
        print("System initialization failed")


@app.post("/analyze")
async def analyze_location(data: Dict[str, Any]):
    try:
        if not advisory_system or not advisory_system.system_ready:
            raise HTTPException(status_code=503, detail="System not ready. Please check system initialization.")

        if not data:
            raise HTTPException(status_code=400, detail="No data provided")

        latitude = float(data['latitude'])
        longitude = float(data['longitude'])
        language = data.get('language', 'en')  # Default to English

        result = advisory_system.analyze_location(
            latitude,
            longitude,
            language,
            data.get('manual_inputs')
        )

        return {
            'success': True,
            'data': result
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid input: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@app.get("/recommendations")
async def get_recommendations(
        latitude: float = Query(..., description="Latitude coordinate"),
        longitude: float = Query(..., description="Longitude coordinate"),
        confidence_min: Optional[float] = Query(None, description="Minimum confidence threshold"),
        limit: Optional[int] = Query(None, description="Maximum number of recommendations")
):
    try:
        if not advisory_system or not advisory_system.system_ready:
            raise HTTPException(status_code=503, detail="System not ready")

        result = advisory_system.analyze_location(latitude, longitude)
        recommendations = result['crop_recommendations']

        # Apply filters
        if confidence_min is not None:
            recommendations = [r for r in recommendations if r['confidence'] >= confidence_min]

        if limit is not None:
            recommendations = recommendations[:limit]

        return {
            'success': True,
            'data': recommendations,
            'total': len(recommendations)
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid parameters: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recommendations failed: {str(e)}")


@app.post("/analyze-crops")
async def analyze_crop(
        language: str = Form("en"),
        file: UploadFile = File(...)
):
    try:
        img_bytes = await file.read()
        mime_type = file.content_type
        lang = language

        result = analyze_disease(img_bytes, mime_type, lang)
        return JSONResponse(content={"result": result})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


@app.post("/identify-crops")
async def identify_crops(
        language: str = Form("en"),
        file: UploadFile = File(...)
):
    try:
        img_bytes = await file.read()
        mime_type = file.content_type
        lang = language

        result = identify_crop(img_bytes, mime_type, lang)
        return JSONResponse(content={"result": result})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


class ChatRequest(BaseModel):
    message: str
    language: str


@app.post("/chatbot")
async def chatbot_endpoint(request: ChatRequest):
    print(f"Received chatbot request: {request}")
    print(f"Message: {request.message}, Language: {request.language}")
    try:
        user_input = request.message
        if not user_input:
            raise HTTPException(status_code=400, detail="Message is required")

        bot_reply = chat_with_bhoomibandhu(user_input, request.language)
        return {"success": True, "reply": bot_reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chatbot error: {str(e)}")


@app.post("/soil-advisory")
async def soil_advisory_endpoint(request: ChatRequest):
    print(f"Received soil advisory request: {request}")
    print(f"Message: {request.message}, Language: {request.language}")
    try:
        user_input = request.message
        if not user_input:
            raise HTTPException(status_code=400, detail="Message is required")

        bot_reply = chat_with_bhoomibandhu(user_input, request.language)
        return {"success": True, "reply": bot_reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Soil advisory error: {str(e)}")


@app.post("/sensor-analyze")
async def sensor_analyze(payload: SensorAnalyzeRequest):
    return await analyze_sensor_data(payload)
@app.get("/")
async def keep_alive():
    return JSONResponse(content={"status": "alive"})


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
