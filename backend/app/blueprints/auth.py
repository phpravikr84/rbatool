from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
)
from ..models.security import User
from ..extensions import db

bp = Blueprint("auth", __name__)

# -----------------
# Login endpoint
# -----------------
@bp.post("/login")
def login():
    data = request.get_json() or {}
    email = data.get("email", "").lower().strip()
    password = data.get("password", "")

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password) or not user.is_active:
        return jsonify({"message": "Invalid credentials"}), 401

    roles = [r.name for r in user.roles]
    access = create_access_token(identity={"id": user.id, "roles": roles})
    refresh = create_refresh_token(identity={"id": user.id, "roles": roles})

    return jsonify(
        {
            "access": access,
            "refresh": refresh,
            "user": {
                "id": user.id,
                "email": user.email,
                "full_name": user.full_name,
                "roles": roles,
            },
        }
    )

# -----------------
# Refresh endpoint
# -----------------
@bp.post("/refresh")
@jwt_required(refresh=True)
def refresh():
    ident = get_jwt_identity()
    new_access = create_access_token(identity=ident)
    return jsonify({"access": new_access})

# -----------------
# Me endpoint (get logged-in user info)
# -----------------
@bp.get("/me")
@jwt_required()
def me():
    ident = get_jwt_identity()
    return jsonify(ident)