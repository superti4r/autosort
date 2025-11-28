import cv2
import numpy as np

def preprocess_mushroom_image_bgr(
    img_bgr,
    target_size=(256, 256),
    alpha=1.2,
    beta=20,
    lower_hsv=np.array([4, 34, 35]),
    upper_hsv=np.array([25, 255, 255]),
    min_area=500
):
    
    if img_bgr is None:
        raise ValueError("img_bgr = None")

    img_resized = cv2.resize(img_bgr, target_size)
    img_bright = cv2.convertScaleAbs(img_resized, alpha=alpha, beta=beta)
    img_hsv = cv2.cvtColor(img_bright, cv2.COLOR_BGR2HSV)

    mask = cv2.inRange(img_hsv, lower_hsv, upper_hsv)

    kernel = np.ones((5, 5), np.uint8)
    mask_closed = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel, iterations=2)
    mask_opened = cv2.morphologyEx(mask_closed, cv2.MORPH_OPEN, kernel, iterations=1)

    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(mask_opened, connectivity=8)
    mask_filtered = np.zeros_like(mask_opened)

    for i in range(1, num_labels):
        if stats[i, cv2.CC_STAT_AREA] >= min_area:
            mask_filtered[labels == i] = 255

    reconstructed_bgr = cv2.bitwise_and(img_bright, img_bright, mask=mask_filtered)

    return reconstructed_bgr, mask_filtered