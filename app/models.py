from datetime import datetime
from .extensions import db
from passlib.hash import pbkdf2_sha256

class MushroomRecord(db.Model):
    __tablename__ = "mushroom_records"
    id = db.Column(db.Integer, primary_key=True)
    grade = db.Column(db.String(1), nullable=False)  # 'A','B','C'
    image_path = db.Column(db.String(255), nullable=True)
    confidence = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)

class SystemStatus(db.Model):
    __tablename__ = "system_status"
    id = db.Column(db.Integer, primary_key=True)
    cpu_temp = db.Column(db.Float, default=0.0)
    cpu_usage = db.Column(db.Float, default=0.0)
    mem_usage = db.Column(db.Float, default=0.0)
    notes = db.Column(db.String(255), default="")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class ApiKey(db.Model):
    __tablename__ = "api_keys"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    key_hash = db.Column(db.String(255), nullable=False, unique=True)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_used_at = db.Column(db.DateTime, nullable=True)

    @staticmethod
    def hash_key(raw: str) -> str:
        return pbkdf2_sha256.hash(raw)

    def verify(self, raw: str) -> bool:
        return pbkdf2_sha256.verify(raw, self.key_hash)
