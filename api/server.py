from fastapi import FastAPI, BackgroundTasks
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from services.mqtt_service import mqtt_client
from services.camera_service import camera
from services.orchestrator import orchestrator
import uvicorn

app = FastAPI(title="Mushroom Grading IoT System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    init_db()
    mqtt_client.start()
    orchestrator.start_loop()

@app.get("/")
def read_root():
    return {"status": "System Online", "service": "Mushroom Grading"}

def gen_frames():
    while True:
        frame_bytes = camera.get_jpg_bytes()
        if frame_bytes:
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.get("/video_feed")
def video_feed():
    return StreamingResponse(gen_frames(), media_type="multipart/x-mixed-replace; boundary=frame")

@app.get("/telemetry")
def get_telemetry():
    return mqtt_client.esp32_data

@app.get("/prediction/current")
def get_current_prediction():
    if orchestrator.last_prediction_result:
        return orchestrator.last_prediction_result
    return {"message": "Waiting for prediction..."}

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)