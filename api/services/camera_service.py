import cv2
import threading
import time
from config import settings

class VideoCamera:
    def __init__(self):
        self.video = None
        self.grabbed = False
        self.frame = None
        self.lock = threading.Lock()
        self.running = False
        self.thread = None
        
        self.prediction_text = "Menunggu..."
        self.prediction_color = (255, 255, 255)

    def set_prediction_overlay(self, label, prob_dict):
        top_score = prob_dict.get(label, 0.0) * 100
        self.prediction_text = f"Terdeteksi : Grade {label} ({top_score:.1f}%)"
        
        if label == "A":
            self.prediction_color = (0, 255, 0)
        elif label == "B":
            self.prediction_color = (0, 255, 255)
        else:
            self.prediction_color = (0, 0, 255)

    def start(self):
        if self.running: return

        print(f"--> Starting Camera Index: {settings.CAMERA_INDEX}")
        self.video = cv2.VideoCapture(settings.CAMERA_INDEX, cv2.CAP_V4L2)
        
        self.video.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc(*'MJPG'))
        self.video.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
        self.video.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
        self.video.set(cv2.CAP_PROP_FPS, 60)
        self.video.set(cv2.CAP_PROP_BUFFERSIZE, 1)

        if self.video.isOpened():
            self.grabbed, self.frame = self.video.read()
            if not self.grabbed:
                print("!!! WARNING: Failed to grab first frame.")
            else:
                print("--> Camera Started.")
        else:
            print("!!! ERROR: Could not open camera.")

        self.running = True
        self.thread = threading.Thread(target=self.update, args=())
        self.thread.daemon = True
        self.thread.start()

    def stop(self):
        self.running = False
        if self.video and self.video.isOpened():
            self.video.release()

    def update(self):
        while self.running:
            if self.video and self.video.isOpened():
                grabbed, frame = self.video.read()
                if grabbed:
                    with self.lock:
                        self.grabbed = grabbed
                        self.frame = frame
                else:
                    time.sleep(0.005)
            else:
                time.sleep(0.1)

    def get_frame(self):
        with self.lock:
            if self.grabbed and self.frame is not None:
                display_frame = self.frame.copy()
                
                text = self.prediction_text
                color = self.prediction_color
                
                cv2.rectangle(display_frame, (0, 0), (1280, 60), (0, 0, 0), -1)
                
                cv2.putText(display_frame, text, (30, 40), 
                           cv2.FONT_HERSHEY_SIMPLEX, 1.2, color, 2, cv2.LINE_AA)
                
                h, w, _ = display_frame.shape
                cv2.rectangle(display_frame, (w//2 - 150, h//2 - 150), 
                                             (w//2 + 150, h//2 + 150), color, 2)
                
                return display_frame
            return None

    def get_jpg_bytes(self):
        frame = self.get_frame()
        if frame is None: return None
        try:
            ret, jpeg = cv2.imencode('.jpg', frame, [int(cv2.IMWRITE_JPEG_QUALITY), 50])
            return jpeg.tobytes()
        except Exception: return None

camera = VideoCamera()