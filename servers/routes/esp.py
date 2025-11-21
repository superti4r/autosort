from fastapi import APIRouter
from typing import Literal
from pydantic import BaseModel, Field

from services.s_esp import (
    get_device_info,
    get_sensors_status,
    control_conveyor,
    control_servo,
)

router = APIRouter()


class ConveyorControlRequest(BaseModel):
    direction: Literal["forward", "backward", "stop"] = Field("forward")
    speed: float = Field(1.0, ge=0.0, le=1.0)


class ServoControlRequest(BaseModel):
    grade: Literal["A", "B", "C"]


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
    return await control_servo(grade=body.grade)
