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
        while self.running:
            frame = camera.get_frame()
            if frame is not None:
                try:
                    preprocessed, _ = preprocess_mushroom_image_bgr(frame)
                    features = extract_features_from_bgr(preprocessed)

                    if features:
                        label, probs = predict_from_features_dict(features)
                        
                        self.last_prediction_result = {
                            "label": label,
                            "probs": probs
                        }

                        mqtt_client.publish_command(str(label))

                        db = SessionLocal()
                        history = PredictionHistory(
                            prediction=label,
                            probability=probs
                        )
                        db.add(history)
                        db.commit()
                        db.close()
                        
                        print(f"Predicted: {label} -> Saved to DB & MQTT Sent.")
                    else:
                        print("No object detected/features extraction failed.")

                except Exception as e:
                    print(f"Error in orchestration loop: {e}")

            time.sleep(2)

orchestrator = SystemOrchestrator()