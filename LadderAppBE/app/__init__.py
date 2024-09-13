from flask import Flask, jsonify, request, session
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import CORS
from config import ApplicationConfig
from app.models import Rank
from app.models import User

bcrypt = Bcrypt()
server_session = Session()

def create_app():
    app = Flask(__name__)
    app.config.from_object(ApplicationConfig)

    from app.models import db
    db.init_app(app)
    
    bcrypt = Bcrypt(app)
    CORS(app, supports_credentials=True)
    server_session = Session(app)

    #register routes
    from app.routes.auth_routes import register_user, login_user, logout_user, get_current_user

    app.add_url_rule('/register', view_func=register_user, methods=['POST'])
    app.add_url_rule('/login', view_func=login_user, methods=['POST'])
    app.add_url_rule('/logout', view_func=logout_user, methods=['POST'])
    app.add_url_rule('/@me', view_func=get_current_user, methods=['GET'])

    #rank routes
    from app.routes.rank_routes import add_initial_rank

    app.add_url_rule('/add_initial_rank', view_func=add_initial_rank, methods=['POST'])

    with app.app_context():
        db.create_all()

    @app.shell_context_processor
    def make_shell_context():
        return {'db': db, 'User':User, 'Rank':Rank}

    return app