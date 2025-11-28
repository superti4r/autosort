import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DB_URL = os.getenv("DB_URL")
    MQTT_BROKER = os.getenv("MQTT_BROKER")
    MQTT_PORT = int(os.getenv("MQTT_PORT", 1883))
    MQTT_TOPIC_SUB = os.getenv("MQTT_TOPIC_SUB")
    MQTT_TOPIC_PUB = os.getenv("MQTT_TOPIC_PUB")
    CAMERA_INDEX = int(os.getenv("CAMERA_INDEX", 0))
    
    MODEL_PATH = os.getenv("MODEL_PATH")
    ENCODER_PATH = os.getenv("ENCODER_PATH")
    SCALER_PATH = os.getenv("SCALER_PATH")

settings = Settings()