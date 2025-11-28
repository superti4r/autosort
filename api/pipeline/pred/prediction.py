import pandas as pd
import joblib
from config import settings

print("Loading Models...")
try:
    model = joblib.load(settings.MODEL_PATH)
    encoder = joblib.load(settings.ENCODER_PATH)
    scaler = joblib.load(settings.SCALER_PATH)
    print("Models Loaded Successfully.")
except Exception as e:
    print(f"Error loading models: {e}")
    model, encoder, scaler = None, None, None

def predict_from_features_dict(features_dict: dict):
    if model is None or encoder is None or scaler is None:
        raise RuntimeError("Models are not loaded.")

    X = pd.DataFrame([features_dict])

    if hasattr(scaler, 'feature_names_in_'):
        X = X[scaler.feature_names_in_]
    
    X_scaled = scaler.transform(X)

    pred_encoded = model.predict(X_scaled)[0]
    probs = model.predict_proba(X_scaled)[0]

    label = encoder.inverse_transform([pred_encoded])[0]

    prob_dict = {
        str(cls): float(probs[i])
        for i, cls in enumerate(encoder.classes_)
    }

    return label, prob_dict