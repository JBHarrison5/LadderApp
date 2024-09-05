from flask import request
from app.controllers.auth_controllers import register_user_controller, login_user_controller, logout_user_controller, get_current_user_controller
def register_user():
    return register_user_controller(request)


def login_user():
    return login_user_controller(request)


def logout_user():
    return logout_user_controller()

def get_current_user():
    return get_current_user_controller()