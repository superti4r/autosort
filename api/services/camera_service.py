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

        print(f"--> Starting Camera Index: {settings.CAMERA_INDEX} (Sports Mode: 720p 60FPS)")
        
        self.video = cv2.VideoCapture(settings.CAMERA_INDEX, cv2.CAP_V4L2)
        
        self.video.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc(*'MJPG'))
        self.video.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
        self.video.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
        self.video.set(cv2.CAP_PROP_FPS, 60)
        self.video.set(cv2.CAP_PROP_BUFFERSIZE, 1)

        if self.video.isOpened():
            self.grabbed, self.frame = self.video.read()
            if not self.grabbed:
                print("!!! WARNING: Kamera terbuka tapi gagal menangkap frame awal.")
            else:
                actual_w = self.video.get(cv2.CAP_PROP_FRAME_WIDTH)
                actual_h = self.video.get(cv2.CAP_PROP_FRAME_HEIGHT)
                actual_fps = self.video.get(cv2.CAP_PROP_FPS)
                print(f"--> Camera Started. Resolution: {int(actual_w)}x{int(actual_h)} @ {int(actual_fps)} FPS")
        else:
            print("!!! ERROR: Tidak bisa membuka kamera.")

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
                return self.frame.copy()
            return None

    def get_jpg_bytes(self):
        frame = self.get_frame()
        if frame is None:
            return None
        try:
            ret, jpeg = cv2.imencode('.jpg', frame, [int(cv2.IMWRITE_JPEG_QUALITY), 50])
            return jpeg.tobytes()
        except Exception:
            return None

camera = VideoCamera()