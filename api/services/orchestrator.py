import time
import threading
import os
import cv2
from datetime import datetime
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
        self.image_folder = "captured_images"
        os.makedirs(self.image_folder, exist_ok=True)
        
        self.detection_event = threading.Event()
        self.current_detection_data = None

    def start_loop(self):
        if not self.running:
            self.running = True
            mqtt_client.set_detection_callback(self.trigger_processing)
            self.thread = threading.Thread(target=self.process_loop)
            self.thread.daemon = True
            self.thread.start()

    def trigger_processing(self, data):
        print("--> Orchestrator Triggered by Sensor!")
        self.current_detection_data = data
        self.detection_event.set()

    def process_loop(self):
        print("--> Orchestrator Ready (Waiting for ESP32 Sensor...)")
        while self.running:
            is_triggered = self.detection_event.wait(timeout=1.0)
            if is_triggered:
                self.detection_event.clear()
                time.sleep(0.5) 

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

                            mqtt_client.publish_grade(str(label))

                            timestamp_str = datetime.now().strftime("%y%m%d_%H%M%S")
                            filename = f"img_{timestamp_str}.jpg"
                            save_path = os.path.join(self.image_folder, filename)
                            cv2.imwrite(save_path, frame_for_ml)

                            db = SessionLocal()
                            try:
                                history = PredictionHistory(
                                    file_path=filename,
                                    prediction=label,
                                    probability=probs
                                )
                                db.add(history)
                                db.commit()
                                print(f"--> Saved: Grade {label} | File: {filename}")
                            except Exception as db_err:
                                print(f"Database Error: {db_err}")
                                db.rollback()
                            finally:
                                db.close()
                            
                            camera.set_prediction_overlay(label, probs)
                        else:
                            print("No object detected in ML Pipeline.")
                            camera.prediction_text = "Gagal Deteksi"
                            camera.prediction_color = (0, 0, 255)

                    except Exception as e:
                        print(f"Error Loop: {e}")
                else:
                    print("!!! Camera Frame Empty")

orchestrator = SystemOrchestrator()