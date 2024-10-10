from flask import request
from app.controllers.challenge_controllers import add_challenge_controller

def add_challenge():
    return add_challenge_controller(request)