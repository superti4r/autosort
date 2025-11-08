import os, secrets
from functools import wraps
from flask import request, jsonify
from .extensions import db
from .models import ApiKey

def generate_api_key():
    raw = secrets.token_urlsafe(32)
    return raw, ApiKey.hash_key(raw)

def require_api_key():
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            token = request.headers.get("X-API-Key") or request.args.get("api_key")
            if not token:
                return jsonify({"error": "API key required"}), 401
            key = ApiKey.query.filter_by(is_active=True).all()
            for k in key:
                if k.verify(token):
                    k.last_used_at = db.func.now()
                    db.session.commit()
                    return f(*args, **kwargs)
            return jsonify({"error": "Invalid API key"}), 403
        return wrapper
    return decorator
