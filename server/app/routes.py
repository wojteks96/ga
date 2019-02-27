from app import app


@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"


@app.route('/auth/login', methods=['POST'])
def login():
    raise NotImplementedError('login not implemented')
