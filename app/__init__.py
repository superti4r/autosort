import os
from flask import Flask
from .config import Config
from .extensions import db, migrate
from .routes.api import api_bp
from .routes.dashboard import dashboard_bp
from .routes.stream import stream_bp

def create_app():
    app = Flask(__name__, static_folder="static", template_folder="templates")
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(api_bp, url_prefix="/api")
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(stream_bp)

    os.makedirs(os.path.join(app.static_folder, "captures"), exist_ok=True)

    return app
