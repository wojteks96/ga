import base64

import itsdangerous
from werkzeug.security import generate_password_hash, check_password_hash

from app import app, db
from errors import UnauthorizedHTTPError


AUTH_TOKEN_EXPIRATION = 60 * 60 * 24 * 30  # 30 days


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_auth_token(self):
        s = itsdangerous.TimedJSONWebSignatureSerializer(
           app.config['SECRET_KEY'],
           expires_in=AUTH_TOKEN_EXPIRATION,
        )
        return base64.b64encode(s.dumps({'id': self.id})).decode()

    @classmethod
    def get_user_from_auth_token(cls, auth_token):
        try:
            auth_token_bytes = base64.b64decode(auth_token.encode())
        except TypeError:
            raise UnauthorizedHTTPError.token_invalid()

        s = itsdangerous.TimedJSONWebSignatureSerializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(auth_token_bytes)
        except itsdangerous.SignatureExpired:
            raise UnauthorizedHTTPError.token_expired()
        except itsdangerous.BadSignature:
            raise UnauthorizedHTTPError.token_invalid()

        if 'id' not in data:
            raise UnauthorizedHTTPError.token_invalid()

        return User.query.get(data['id'])

    @classmethod
    def get_user_from_credentials(cls, username, password):
        user = User.query.filter_by(username=username).one()
        if not user.check_password(password):
            raise UnauthorizedHTTPError.credentials_invalid()

        return user
