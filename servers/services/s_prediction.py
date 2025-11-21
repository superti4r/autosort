import os
import pickle
from pathlib import Path
from typing import Any, Dict

from config.c_camera import CameraContext
from .s_extraction import extract_features
from .s_camera import capture_image
from .s_storing import store_result

_prediction_model: Any | None = None
_label_encoder: Any | None = None


def load_prediction_model():
    global _prediction_model, _label_encoder

    if _prediction_model is not None:
        return _prediction_model, _label_encoder

    path_str = os.getenv("PREDICTION_MODEL_PATH")
    path = Path(path_str)
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


def _build_probability_dict(
    model: Any,
    label_encoder: Any | None,
    features,
) -> Dict[str, float] | None:
    if not hasattr(model, "predict_proba"):
        return None

    proba_arr = model.predict_proba([features])[0]
    classes = model.classes_

    if label_encoder is not None:
        labels = label_encoder.inverse_transform(classes)
    else:
        labels = classes

    return {str(lbl): float(prob) for lbl, prob in zip(labels, proba_arr)}


def predict_image(image_path: str) -> Dict[str, Any]:

    model, label_encoder = load_prediction_model()
    features = extract_features(image_path)

    probability = _build_probability_dict(model, label_encoder, features)

    y_pred = model.predict([features])[0]

    if label_encoder is not None:
        label = label_encoder.inverse_transform([y_pred])[0]
    else:
        label = y_pred

    return {
        "raw_prediction": int(y_pred) if isinstance(y_pred, (int, float)) else y_pred,
        "label": str(label),
        "probability": probability,
    }

def auto_capture_and_predict(
    ctx: CameraContext,
    output_dir: str = "captures",
) -> Dict[str, Any]:

    cap_result = capture_image(ctx, output_dir=output_dir)
    if cap_result.get("status") != "ok":
        return {
            "status": "error",
            "message": cap_result.get("message", "Gagal capture gambar"),
        }

    image_path = cap_result["file"]

    pred = predict_image(image_path)

    history_id = store_result(
        file_path=image_path,
        prediction_result=pred,
    )

    return {
        "status": "ok",
        "history_id": history_id,
        "file_path": image_path,
        "prediction": pred.get("label"),
        "probability": pred.get("probability"),
        "raw_prediction": pred.get("raw_prediction"),
    }