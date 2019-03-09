import abc


class BaseHTTPError(Exception):

    __meta__ = abc.ABCMeta

    def __init__(self, msg, error_code):
        self.msg = msg
        self.error_code = error_code

    @abc.abstractproperty
    def return_code(self):
        raise NotImplementedError


class UnauthorizedHTTPError(BaseHTTPError):

    # Error codes
    TOKEN_EXPIRED = 'TOKEN_EXPIRED'
    TOKEN_INVALID = 'TOKEN_INVALID'
    TOKEN_MISSING = 'TOKEN_MISSING'
    CREDENTIALS_INVALID = 'CREDENTIALS_INVALID'

    @property
    def return_code(self):
        return 401

    @classmethod
    def token_expired(cls):
        return cls('Auth token expired', cls.TOKEN_EXPIRED)

    @classmethod
    def token_missing(cls):
        return cls('Auth token missing', cls.TOKEN_MISSING)

    @classmethod
    def token_invalid(cls):
        return cls('Auth token invalid', cls.TOKEN_INVALID)

    @classmethod
    def credentials_invalid(cls):
        return cls('Invalid username or password', cls.CREDENTIALS_INVALID)


class BadRequestHTTPError(BaseHTTPError):

    # Error codes
    REQUEST_INVALID = 'REQUEST_INVALID'

    @property
    def return_code(self):
        return 400

    @classmethod
    def request_invalid(cls, msg):
        return cls(msg, cls.REQUEST_INVALID)


