from flask import request
from app.controllers.challenge_controllers import add_challenge_controller, challenge_reply_controller

def add_challenge():
    return add_challenge_controller(request)

def challenge_reply():
    return challenge_reply_controller(request)