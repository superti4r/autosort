import paho.mqtt.client as mqtt
import json
import ssl
from config import settings

class MQTTService:
    def __init__(self):
        self.client = mqtt.Client(client_id=settings.MQTT_CLIENT_ID)
        
        if settings.MQTT_USERNAME and settings.MQTT_PASSWORD:
            self.client.username_pw_set(settings.MQTT_USERNAME, settings.MQTT_PASSWORD)
        
        self.client.tls_set(cert_reqs=ssl.CERT_NONE)
        self.client.tls_insecure_set(True)

        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        self.on_detection_callback = None
        self.esp32_data = {}

    def set_detection_callback(self, callback_func):
        self.on_detection_callback = callback_func

    def on_connect(self, client, userdata, flags, rc):
        if rc == 0:
            print("--> MQTT Connected to HiveMQ Cloud!")
            client.subscribe(settings.MQTT_TOPIC_DETECTION)
            client.subscribe(settings.MQTT_TOPIC_STATUS)
            print(f"--> Subscribed to: {settings.MQTT_TOPIC_DETECTION}")
        else:
            print(f"!!! MQTT Connection Failed. Code: {rc}")

    def on_message(self, client, userdata, msg):
        try:
            topic = msg.topic
            payload_str = msg.payload.decode()
            data = json.loads(payload_str)

            print(f"[MQTT IN] {topic}: {payload_str}")

            if topic == settings.MQTT_TOPIC_DETECTION:
                if data.get("detected") is True:
                    print("--> SIGNAL DETEKSI DITERIMA DARI ESP32")
                    if self.on_detection_callback:
                        self.on_detection_callback(data)

            elif topic == settings.MQTT_TOPIC_STATUS:
                self.esp32_data.update(data)

        except Exception as e:
            print(f"Error parsing MQTT message: {e}")

    def start(self):
        try:
            print(f"Connecting to MQTT Broker: {settings.MQTT_BROKER}:{settings.MQTT_PORT}...")
            self.client.connect(settings.MQTT_BROKER, settings.MQTT_PORT, 60)
            self.client.loop_start()
        except Exception as e:
            print(f"MQTT Connection Error: {e}")

    def publish_grade(self, grade: str):
        payload = json.dumps({"grade": grade})
        self.client.publish(settings.MQTT_TOPIC_GRADE_RESULT, payload)
        print(f"[MQTT OUT] Grade Sent: {payload}")

    def publish_motor_control(self, command: str):
        payload = json.dumps({"command": command.lower()})
        self.client.publish(settings.MQTT_TOPIC_MOTOR_CONTROL, payload)
        print(f"[MQTT OUT] Motor Command: {payload}")

mqtt_client = MQTTService()