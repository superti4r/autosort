from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from .c_database import init_db, get_db_session_factory
from .c_camera import init_camera
from .c_secret import ensure_app_key

from routes.main import router as main_router
from routes.camera import router as camera_router
from routes.esp import router as esp_router
from routes.logs import router as logs_router


def create_app() -> FastAPI:
    load_dotenv()

    ensure_app_key()

    init_db()
    SessionLocal = get_db_session_factory()

    camera_ctx = init_camera()

    app = FastAPI(
        title=os.getenv("APP_NAME"),
        version="projectpintar.dev-1.0.0",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.state.db_session_factory = SessionLocal
    app.state.camera_ctx = camera_ctx

    app.include_router(main_router)
    app.include_router(camera_router, prefix="/camera", tags=["Camera"])
    app.include_router(esp_router, prefix="/esp", tags=["ESP32"])
    app.include_router(logs_router, prefix="/logs", tags=["Logs"])

    return app
