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

@bp.post("/login")
def login():
    data = request.get_json() or {}
    email = data.get("email", "").lower().strip()
    password = data.get("password", "")

    print("DEBUG: Incoming login request")
    print("DEBUG: Email ->", email)
    print("DEBUG: Password ->", password)

    user = User.query.filter_by(email=email).first()

    if not user:
        print("DEBUG: No user found with that email")
    else:
        print("DEBUG: Found user:", user.email)
        print("DEBUG: User hash from DB:", user.password_hash)
        print("DEBUG: is_active =", user.is_active)
        try:
            print("DEBUG: Password check result ->", user.check_password(password))
        except Exception as e:
            print("DEBUG: Error verifying password:", e)

    if not user or not user.check_password(password):
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


@bp.post("/refresh")
@jwt_required(refresh=True)
def refresh():
    ident = get_jwt_identity()
    new_access = create_access_token(identity=ident)
    return jsonify({"access": new_access})

@bp.get("/me")
@jwt_required()
def me():
    ident = get_jwt_identity()
    return jsonify(ident)
