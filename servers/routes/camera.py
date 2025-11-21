from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from services.s_camera import (
    get_camera_info,
    generate_frames,
    capture_image,
)

router = APIRouter()


@router.get("/info")
async def camera_info(request: Request):
    info = get_camera_info(request.app.state.camera_ctx)
    return info


@router.get("/stream")
async def camera_stream(request: Request):
    camera_ctx = request.app.state.camera_ctx
    return StreamingResponse(
        generate_frames(camera_ctx),
        media_type="multipart/x-mixed-replace; boundary=frame",
    )


@router.post("/capture")
async def camera_capture(request: Request):
    camera_ctx = request.app.state.camera_ctx
    result = capture_image(camera_ctx)
    return result
