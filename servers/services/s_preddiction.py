import os
import pickle
from pathlib import Path
from typing import Any

from .s_extraction import extract_features

_prediction_model: Any | None = None
_label_encoder: Any | None = None


def load_prediction_model():
    global _prediction_model, _label_encoder

    if _prediction_model is not None:
        return _prediction_model, _label_encoder

    path = os.getenv("PREDICTION_MODEL_PATH")
    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(f"Prediction model tidak ditemukan: {path}")

    with path.open("rb") as f:
        data = pickle.load(f)

    if isinstance(data, dict) and "model" in data:
        _prediction_model = data["model"]
        _label_encoder = data.get("label_encoder")
    else:
        _prediction_model = data
        _label_encoder = None

    return _prediction_model, _label_encoder


def predict_image(image_path: str):
    model, label_encoder = load_prediction_model()
    features = extract_features(image_path)

    y_pred = model.predict([features])[0]

    if label_encoder is not None:
        label = label_encoder.inverse_transform([y_pred])[0]
    else:
        label = y_pred

    return {
        "raw_prediction": int(y_pred) if isinstance(y_pred, (int, float)) else y_pred,
        "label": str(label),
    }
