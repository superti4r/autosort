import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    MODEL_TYPE = os.getenv("MODEL_TYPE")
    MODEL_PATH = os.getenv("MODEL_PATH")

    CAMERA_INDEX = int(os.getenv("CAMERA_INDEX"))
    FRAME_WIDTH = int(os.getenv("FRAME_WIDTH"))
    FRAME_HEIGHT = int(os.getenv("FRAME_HEIGHT"))

    DEVICE_NAME = os.getenv("DEVICE_NAME")
    DEVICE_LOCATION = os.getenv("DEVICE_LOCATION")

    PERMANENT_SESSION_LIFETIME = timedelta(days=30)
