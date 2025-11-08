from flask import Blueprint, render_template, current_app
from ..models import MushroomRecord, ApiKey
from ..config import Config
from ..extensions import db

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/")
def home():
    counts = {
        "A": db.session.query(db.func.count()).filter(MushroomRecord.grade=="A").scalar(),
        "B": db.session.query(db.func.count()).filter(MushroomRecord.grade=="B").scalar(),
        "C": db.session.query(db.func.count()).filter(MushroomRecord.grade=="C").scalar(),
    }
    total = sum(counts.values())
    recent = MushroomRecord.query.order_by(MushroomRecord.created_at.desc()).limit(12).all()
    keys = ApiKey.query.order_by(ApiKey.created_at.desc()).limit(5).all()
    device = {
        "name": Config.DEVICE_NAME,
        "location": Config.DEVICE_LOCATION,
    }
    return render_template("dashboard.html", counts=counts, total=total, recent=recent, keys=keys, device=device)
