import os
from dataclasses import dataclass
import cv2


@dataclass
class CameraContext:
    source: str | int
    capture: cv2.VideoCapture | None = None


def init_camera() -> CameraContext:
    source_env = os.getenv("CAMERA_SOURCE")

    try:
        source: int | str = int(source_env)
    except ValueError:
        source = source_env

    cap = cv2.VideoCapture(source)

    if not cap.isOpened():
        print("[WARN] Kamera tidak dapat dibuka. Cek CAMERA_SOURCE / device.")
        cap = None
    else:
        print("[INFO] Kamera berhasil dibuka")

    return CameraContext(source=source, capture=cap)
