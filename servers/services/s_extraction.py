import os
import pickle
from pathlib import Path
from typing import Any

_feature_model: Any | None = None


def load_feature_model():
    global _feature_model
    if _feature_model is not None:
        return _feature_model

    path = os.getenv("FEATURE_MODEL_PATH")
    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(f"Feature model tidak ditemukan: {path}")

    with path.open("rb") as f:
        _feature_model = pickle.load(f)

    return _feature_model


def extract_features(image_path: str):
    model = load_feature_model()

    #logic

    features = model.extract(image_path)
    return features
