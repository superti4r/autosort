import time
import threading
from pipeline.feat.preprocessing import preprocess_mushroom_image_bgr
from pipeline.feat.extraction import extract_features_from_bgr
from pipeline.pred.prediction import predict_from_features_dict
from services.mqtt_service import mqtt_client
from services.camera_service import camera
from database import SessionLocal, PredictionHistory

class SystemOrchestrator:
    def __init__(self):
        self.running = False
        self.thread = None
        self.last_prediction_result = None

    def start_loop(self):
        if not self.running:
            self.running = True
            self.thread = threading.Thread(target=self.process_loop)
            self.thread.daemon = True
            self.thread.start()

    def process_loop(self):
        print("--> Orchestrator Started")
        while self.running:
            with camera.lock:
                frame_for_ml = camera.frame.copy() if camera.frame is not None else None

            if frame_for_ml is not None:
                try:
                    camera.prediction_text = "Mendeteksi..."
                    camera.prediction_color = (200, 200, 200)

                    preprocessed, _ = preprocess_mushroom_image_bgr(frame_for_ml)
                    features = extract_features_from_bgr(preprocessed)

                    if features:
                        label, probs = predict_from_features_dict(features)
                        
                        self.last_prediction_result = {
                            "label": label,
                            "probs": probs
                        }

                        mqtt_client.publish_command(str(label))

                        db = SessionLocal()
                        history = PredictionHistory(prediction=label, probability=probs)
                        db.add(history)
                        db.commit()
                        db.close()
                        
                        camera.set_prediction_overlay(label, probs)
                        print(f"--> Result: {label}")
                    else:
                        print("No object detected.")
                        camera.prediction_text = "Tidak ada objek"
                        camera.prediction_color = (0, 0, 255)

                except Exception as e:
                    print(f"Error Loop: {e}")

            time.sleep(10)

orchestrator = SystemOrchestrator()