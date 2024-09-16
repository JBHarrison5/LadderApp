from flask import request
from app.controllers.match_controllers import add_match_controller

def add_match():
    return add_match_controller(request)