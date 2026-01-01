from flask import make_response, request, jsonify
from flask_jwt_extended import create_access_token
from model.user import User
from werkzeug.security import check_password_hash, generate_password_hash


def register_logic():
    data = request.get_json()
    username = data.get('user_name')
    email = data.get('email')
    password = data.get('password')
    password_confirm = data.get('password_confirm')

    if not username or not email or not password or not password_confirm:
        return make_response(
            jsonify({
                'code': 400,
                'error': 'Missing required fields'
            })
        )

    if User.query.filter_by(email=email).first():
        return make_response(
            jsonify({
                'code': 400,
                'error': 'Email already registered'
            })
        )

    hashed_password = generate_password_hash(password)
    new_user = User(name=username, email=email, password=hashed_password).create_user()

    access_token = create_access_token(identity=new_user.id)
    return make_response(jsonify({
        'code': 200,
        'access_token': access_token
    }))


def login_logic():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return make_response(jsonify({
            'code': 401,
            'error': 'Invalid credentials'
        }))

    access_token = create_access_token(identity=user.id)
    return make_response(jsonify({
        'code': 200,
        'access_token': access_token
    }))
