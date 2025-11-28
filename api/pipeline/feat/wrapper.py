import cv2
from .preprocessing import preprocess_mushroom_image_bgr
from .extraction import extract_features_from_bgr

def extract_features_from_path(image_path):

    img_bgr = cv2.imread(image_path)
    if img_bgr is None:
        raise FileNotFoundError(f"Gambar tidak ditemukan: {image_path}")

    preprocessed_bgr, _ = preprocess_mushroom_image_bgr(img_bgr)
    features_dict = extract_features_from_bgr(preprocessed_bgr)

    return features_dict