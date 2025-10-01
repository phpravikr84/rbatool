from flask import Flask
from flask_cors import CORS
from .extensions import db, migrate, jwt
from .config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # allow frontend dev server
    CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    from .blueprints.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    @app.route("/ping")
    def ping():
        return {"message": "pong"}, 200

    return app
