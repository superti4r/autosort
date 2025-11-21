from fastapi import APIRouter, Request
from pydantic import BaseModel, Field
from typing import Literal

from services.s_esp import (
    get_device_info,
    get_sensors_status,
    control_conveyor,
    control_servo,
    run_conveyor,
    stop_conveyor,
    sort_by_grade,
)
from services.s_prediction import auto_capture_and_predict

router = APIRouter()


class ConveyorControlRequest(BaseModel):
    direction: Literal["forward", "backward", "stop"] = Field("forward")
    speed: float = Field(1.0, ge=0.0, le=1.0)


class ServoControlRequest(BaseModel):
    grade: Literal["DEFAULT", "A", "B", "C"] = Field("DEFAULT")


class ObjectDetectedPayload(BaseModel):
    sensor_type: Literal["ir", "ultrasonic"] = "ir"
    distance_cm: float | None = None
    raw_value: float | None = None

@router.get("/info")
async def esp_info():
    return await get_device_info()


@router.get("/sensors")
async def esp_sensors():
    return await get_sensors_status()

@router.post("/conveyor")
async def esp_conveyor(body: ConveyorControlRequest):
    return await control_conveyor(direction=body.direction, speed=body.speed)

@router.post("/servo")
async def esp_servo(body: ServoControlRequest):
    return await control_servo(grade_code=body.grade)

@router.post("/event/object-detected")
async def esp_object_detected(request: Request, body: ObjectDetectedPayload):
    camera_ctx = request.app.state.camera_ctx

    await stop_conveyor()

    result = auto_capture_and_predict(camera_ctx)
    if result.get("status") != "ok":
        await control_servo("DEFAULT")
        await run_conveyor()
        return {
            "status": "error",
            "message": "Gagal capture/prediksi",
            "detail": result,
        }

    grade = str(result.get("prediction", "")).upper()

    if grade in {"A", "B", "C"}:
        await sort_by_grade(grade)
    else:
        await control_servo("DEFAULT")

    await run_conveyor()

    return {
        "status": "ok",
        "sensor": body.sensor_type,
        "distance_cm": body.distance_cm,
        "raw_value": body.raw_value,
        "history_id": result.get("history_id"),
        "file_path": result.get("file_path"),
        "prediction": grade,
        "probability": result.get("probability"),
    }