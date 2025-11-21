import os
from typing import Any, Dict

import httpx

ESP_BASE_URL = os.getenv("ESP32_BASE_URL")


async def _get(path: str) -> Dict[str, Any]:
    url = f"{ESP_BASE_URL}{path}"
    async with httpx.AsyncClient(timeout=5.0) as client:
        r = await client.get(url)
        r.raise_for_status()
        return r.json()

async def _post(path: str, data: Dict[str, Any]) -> Dict[str, Any]:
    url = f"{ESP_BASE_URL}{path}"
    async with httpx.AsyncClient(timeout=5.0) as client:
        r = await client.post(url, json=data)
        r.raise_for_status()
        return r.json()

async def get_device_info() -> Dict[str, Any]:
    return await _get("/info")


async def get_sensors_status() -> Dict[str, Any]:
    return await _get("/sensors")

async def control_conveyor(direction: str, speed: float) -> Dict[str, Any]:

    payload = {"direction": direction, "speed": speed}
    return await _post("/conveyor", payload)

async def run_conveyor(speed: float = 1.0) -> Dict[str, Any]:
    return await control_conveyor(direction="forward", speed=speed)

async def stop_conveyor() -> Dict[str, Any]:
    return await control_conveyor(direction="stop", speed=0.0)

async def control_servo(grade_code: str) -> Dict[str, Any]:

    payload = {"grade": grade_code}
    return await _post("/servo", payload)

async def set_servo_default() -> Dict[str, Any]:
    return await control_servo("DEFAULT")


async def sort_by_grade(grade: str) -> Dict[str, Any]:
    code = str(grade).strip().upper()
    if code not in {"A", "B", "C"}:
        raise ValueError(f"Grade tidak valid untuk sort_by_grade: {grade}")
    return await control_servo(code)