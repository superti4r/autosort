import cv2
import threading
from config import settings

class VideoCamera:
    def __init__(self):
        self.video = cv2.VideoCapture(settings.CAMERA_INDEX)
        self.video.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.video.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        self.grabbed, self.frame = self.video.read()
        self.lock = threading.Lock()
        self.running = True
        
        self.thread = threading.Thread(target=self.update, args=())
        self.thread.daemon = True
        self.thread.start()

    def __del__(self):
        self.running = False
        self.video.release()

    def update(self):
        while self.running:
            grabbed, frame = self.video.read()
            with self.lock:
                self.grabbed = grabbed
                self.frame = frame

    def get_frame(self):
        with self.lock:
            return self.frame.copy() if self.grabbed else None

    def get_jpg_bytes(self):
        frame = self.get_frame()
        if frame is None:
            return None
        ret, jpeg = cv2.imencode('.jpg', frame)
        return jpeg.tobytes()

camera = VideoCamera()