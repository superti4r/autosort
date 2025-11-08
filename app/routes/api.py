import os, uuid, cv2
from datetime import datetime
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from ..extensions import db
from ..models import MushroomRecord, ApiKey, SystemStatus
from ..config import Config
from ..ml import Classifier, ModelSpec
from ..utils import require_api_key, generate_api_key

api_bp = Blueprint("api", __name__)

_classifier = None

def get_classifier():
    global _classifier
    if _classifier is None:
        spec = ModelSpec(kind=Config.MODEL_TYPE, path=Config.MODEL_PATH, input_size=(224, 224))
        _classifier = Classifier(spec)
    return _classifier

@api_bp.route("/predict", methods=["POST"])
@require_api_key()
def predict():
    """
    Body: multipart/form-data { file: image }
    """
    if "file" not in request.files:
        return jsonify({"error": "image 'file' required"}), 400
    f = request.files["file"]
    filename = secure_filename(f.filename or f"capture-{uuid.uuid4().hex}.jpg")
    raw = f.read()

    import numpy as np
    img_arr = np.frombuffer(raw, np.uint8)
    img = cv2.imdecode(img_arr, cv2.IMREAD_COLOR)

    grade, conf = get_classifier().predict(img)

    ts = datetime.utcnow().strftime("%Y%m%d-%H%M%S")
    out_name = f"{ts}-{grade}-{filename}"
    out_dir = os.path.join(current_app.static_folder, "captures")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, out_name)
    cv2.imwrite(out_path, img)

    rec = MushroomRecord(grade=grade, image_path=f"captures/{out_name}", confidence=conf)
    db.session.add(rec)
    db.session.commit()

    return jsonify({
        "grade": grade,
        "confidence": round(conf, 4),
        "image_url": f"/static/{rec.image_path}",
        "record_id": rec.id
    })

@api_bp.route("/stats")
@require_api_key()
def stats():
    total = db.session.query(db.func.count(MushroomRecord.id)).scalar()
    counts = dict(
        A=db.session.query(db.func.count()).filter(MushroomRecord.grade=="A").scalar(),
        B=db.session.query(db.func.count()).filter(MushroomRecord.grade=="B").scalar(),
        C=db.session.query(db.func.count()).filter(MushroomRecord.grade=="C").scalar(),
    )
    recent = MushroomRecord.query.order_by(MushroomRecord.created_at.desc()).limit(10).all()
    return jsonify({
        "total": total,
        "counts": counts,
        "recent": [
            {"id": r.id, "grade": r.grade, "confidence": r.confidence, "image_url": f"/static/{r.image_path}", "at": r.created_at.isoformat()+"Z"}
            for r in recent
        ]
    })

@api_bp.route("/device")
@require_api_key()
def device():
    st = SystemStatus.query.order_by(SystemStatus.created_at.desc()).first()
    return jsonify({
        "device_name": Config.DEVICE_NAME,
        "location": Config.DEVICE_LOCATION,
        "cpu_temp": getattr(st, "cpu_temp", 0.0),
        "cpu_usage": getattr(st, "cpu_usage", 0.0),
        "mem_usage": getattr(st, "mem_usage", 0.0),
        "notes": getattr(st, "notes", "")
    })

@api_bp.route("/keys", methods=["GET", "POST"])
def keys():
    if request.method == "POST":
        name = request.json.get("name","device")
        raw, hashed = generate_api_key()
        k = ApiKey(name=name, key_hash=hashed, is_active=True)
        db.session.add(k); db.session.commit()
        return jsonify({"api_key": raw, "id": k.id})
    else:
        keys = ApiKey.query.order_by(ApiKey.created_at.desc()).all()
        return jsonify([
            {"id": k.id, "name": k.name, "is_active": k.is_active,
             "created_at": k.created_at.isoformat()+"Z", "last_used_at": k.last_used_at.isoformat()+"Z" if k.last_used_at else None}
            for k in keys
        ])
