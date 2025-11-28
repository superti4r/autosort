import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    CAMERA_INDEX = int(os.getenv("CAMERA_INDEX", 0))
    DB_URL = os.getenv("DATABASE_URL")

    MQTT_BROKER = os.getenv("MQTT_BROKER")
    MQTT_PORT = int(os.getenv("MQTT_PORT", 8883))
    MQTT_USERNAME = os.getenv("MQTT_USERNAME")
    MQTT_PASSWORD = os.getenv("MQTT_PASSWORD")
    MQTT_CLIENT_ID = os.getenv("MQTT_CLIENT_ID")
    
    MQTT_TOPIC_STATUS = os.getenv("MQTT_TOPIC_STATUS", "mushroom/status")
    MQTT_TOPIC_DETECTION = os.getenv("MQTT_TOPIC_DETECTION", "mushroom/detection")
    MQTT_TOPIC_GRADE_RESULT = os.getenv("MQTT_TOPIC_GRADE_RESULT", "mushroom/grade/result")
    MQTT_TOPIC_MOTOR_CONTROL = os.getenv("MQTT_TOPIC_MOTOR_CONTROL", "mushroom/motor/control")

    MODEL_PATH = os.getenv("MODEL_PATH")
    ENCODER_PATH = os.getenv("ENCODER_PATH")
    SCALER_PATH = os.getenv("SCALER_PATH")

settings = Settings()