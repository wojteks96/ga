import json

from flask import request

from app.models import User
from app import app
from errors import BadRequestHTTPError


@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"


@app.route('/auth/login', methods=['POST'])
def auth_login():
    data = request.json

    email = data.get('email')
    password = data.get('password')

    if email is None or password is None:
        raise BadRequestHTTPError('Missing email or password')

    user = User.get_user_from_credentials(email, password)
    auth_token = user.get_auth_token()
    return json.dumps({'auth_token': auth_token})


@app.route('/auth/check_token', methods=['POST'])
def auth_check_token():
    data = request.json

    auth_token = data.get('auth_token')

    if auth_token is None:
        raise BadRequestHTTPError('Missing auth_token')

    user = User.get_user_from_auth_token(auth_token)
    return json.dumps({'username': user.username})
