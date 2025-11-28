import paho.mqtt.client as mqtt
import json
from config import settings

class MQTTService:
    def __init__(self):
        self.client = mqtt.Client()
        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        self.esp32_data = {"temp": 0, "idle": 0, "ping": 0}

    def on_connect(self, client, userdata, flags, rc):
        print(f"Connected to MQTT Broker with result code {rc}")
        client.subscribe(settings.MQTT_TOPIC_SUB)

    def on_message(self, client, userdata, msg):
        try:
            payload = msg.payload.decode()
            data = json.loads(payload)
            self.esp32_data.update(data)
        except Exception as e:
            print(f"Error parsing MQTT message: {e}")

    def start(self):
        try:
            self.client.connect(settings.MQTT_BROKER, settings.MQTT_PORT, 60)
            self.client.loop_start()
        except Exception as e:
            print(f"MQTT Connection Error: {e}")

    def publish_command(self, command: str):
        self.client.publish(settings.MQTT_TOPIC_PUB, command)
        print(f"Published MQTT Command: {command}")

mqtt_client = MQTTService()