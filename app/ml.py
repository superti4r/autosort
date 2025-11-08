import os, numpy as np, cv2
from PIL import Image
from dataclasses import dataclass

@dataclass
class ModelSpec:
    kind: str
    path: str
    input_size: tuple

class Classifier:
    def __init__(self, spec: ModelSpec):
        self.spec = spec
        if spec.kind == "h5":
            import tensorflow as tf
            self.tf = tf
            self.model = tf.keras.models.load_model(spec.path)
        elif spec.kind == "tflite":
            import tflite_runtime.interpreter as tflite
            self.interpreter = tflite.Interpreter(model_path=spec.path)
            self.interpreter.allocate_tensors()
            self.input_details = self.interpreter.get_input_details()
            self.output_details = self.interpreter.get_output_details()
        else:
            raise ValueError("MODEL_TYPE should be 'h5' or 'tflite'")

    def _preproc(self, img_bgr):
        img = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
        img = cv2.resize(img, self.spec.input_size)
        arr = (img.astype("float32") / 255.0)[None, ...]
        return arr

    def predict(self, img_bgr):
        x = self._preproc(img_bgr)
        if self.spec.kind == "h5":
            probs = self.model.predict(x, verbose=0)[0]
        else:
            self.interpreter.set_tensor(self.input_details[0]["index"], x)
            self.interpreter.invoke()
            probs = self.interpreter.get_tensor(self.output_details[0]["index"])[0]
        idx = int(np.argmax(probs))
        conf = float(probs[idx])
        mapping = {0: "A", 1: "B", 2: "C"}
        return mapping.get(idx, "C"), conf
