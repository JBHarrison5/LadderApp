from flask import request
from app.controllers.rank_controllers import add_initial_rank_controller

def add_initial_rank():
    return add_initial_rank_controller(request)