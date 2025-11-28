from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
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

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

@app.on_event("startup")
def startup_event():
    init_db()
    camera.start()
    mqtt_client.start()
    orchestrator.start_loop()

@app.on_event("shutdown")
def shutdown_event():
    camera.stop()

@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

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
    return {"label": "None", "probs": {}}

@app.post("/control/motor/{command}")
def control_motor(command: str):
    if command.lower() in ["start", "stop"]:
        mqtt_client.publish_motor_control(command)
        return {"status": "success", "command": command}
    return {"status": "error", "message": "Invalid command"}

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)