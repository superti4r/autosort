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

    def start(self):
        if self.running:
            return

        print(f"--> Starting Camera Index: {settings.CAMERA_INDEX}")
        self.video = cv2.VideoCapture(settings.CAMERA_INDEX, cv2.CAP_V4L2)
        self.video.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc(*'MJPG'))
        self.video.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.video.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

        if self.video.isOpened():
            self.grabbed, self.frame = self.video.read()
            if not self.grabbed:
                print("!!! WARNING: Camera opened but failed to grab first frame.")
            else:
                print("--> Camera started successfully.")
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
                    time.sleep(0.1)
            else:
                time.sleep(0.1)

    def get_frame(self):
        with self.lock:
            if self.grabbed and self.frame is not None:
                return self.frame.copy()
            return None

    def get_jpg_bytes(self):
        frame = self.get_frame()
        if frame is None:
            return None
        try:
            ret, jpeg = cv2.imencode('.jpg', frame)
            return jpeg.tobytes()
        except Exception:
            return None

camera = VideoCamera()