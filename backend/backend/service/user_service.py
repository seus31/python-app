from flask import make_response, request, jsonify
from marshmallow import ValidationError
from model.user import User, UserSchema


def get_users_logic():
    users = User.get_user_list()
    user_schema = UserSchema(many=True)
    return make_response(jsonify({
        'code': 200,
        'users': user_schema.dump(users)
    }))


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
