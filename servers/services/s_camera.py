import cv2
import time
from pathlib import Path
from typing import Generator

from config.c_camera import CameraContext


def get_camera_info(ctx: CameraContext) -> dict:
    cap = ctx.capture
    if cap is None or not cap.isOpened():
        return {"status": "error", "message": "Kamera tidak tersedia"}

    width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
    height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
    fps = cap.get(cv2.CAP_PROP_FPS)

    return {
        "status": "ok",
        "source": ctx.source,
        "width": width,
        "height": height,
        "fps": fps,
    }


def generate_frames(ctx: CameraContext) -> Generator[bytes, None, None]:
    cap = ctx.capture
    if cap is None:
        raise RuntimeError("Kamera belum diinisialisasi")

    while True:
        success, frame = cap.read()
        if not success:
            break

        _, buffer = cv2.imencode(".jpg", frame)
        frame_bytes = buffer.tobytes()

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n"
        )
        time.sleep(0.03)


def capture_image(ctx: CameraContext, output_dir: str = "captures") -> dict:

    cap = ctx.capture
    if cap is None:
        return {"status": "error", "message": "Kamera belum diinisialisasi"}

    success, frame = cap.read()
    if not success:
        return {"status": "error", "message": "Gagal menangkap gambar"}

    out_dir = Path(output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    filename = f"capture_{int(time.time())}.jpg"
    path = out_dir / filename
    cv2.imwrite(str(path), frame)

    rel_path = str(path.relative_to(Path.cwd()))

    return {
        "status": "ok",
        "file": rel_path,
        "filename": filename,
    }
