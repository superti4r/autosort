from flask import Blueprint, Response, current_app
from ..camera import open_camera, mjpeg_generator

stream_bp = Blueprint("stream", __name__)
_cap = None

@stream_bp.route("/video_feed")
def video_feed():
    global _cap
    if _cap is None:
        _cap = open_camera()
    return Response(mjpeg_generator(_cap),
                    mimetype="multipart/x-mixed-replace; boundary=frame")
