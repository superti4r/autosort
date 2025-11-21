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


async def control_servo(grade: str) -> Dict[str, Any]:
    payload = {"grade": grade}
    return await _post("/servo", payload)
