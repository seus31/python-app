from flask import make_response, request, jsonify
from marshmallow import ValidationError
from model.user import User, UserSchema
from werkzeug.security import generate_password_hash


def get_users_logic():
    users = User.get_user_list()
    user_schema = UserSchema(many=True)
    return make_response(jsonify({
        'code': 200,
        'users': user_schema.dump(users)
    }))


def post_user_logic():
    data = request.json
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
    user_schema = UserSchema(many=False)

    return make_response(
        jsonify({
            'code': 201,
            'user': user_schema.dump(new_user)
        })
    )


def get_user_logic(user_id):
    user = User.query.get_or_404(user_id)
    user_schema = UserSchema()
    return make_response(jsonify({
        'code': 200,
        'user': user_schema.dump(user)
    }))


def update_user_logic(user_id):
    user = User.query.get_or_404(user_id)
    data = request.json

    try:
        user_schema = UserSchema()
        updated_data = user_schema.load(data, partial=True)
    except ValidationError as err:
        return jsonify(err.messages), 400

    user.update_user(updated_data)

    return make_response(jsonify({
        'code': 200,
        'user': user_schema.dump(user)
    }))


def delete_user_logic(user_id):
    user = User.query.get_or_404(user_id)
    user.delete_user()

    return make_response(jsonify({
        'code': 200,
        'message': 'User deleted successfully'
    }))
