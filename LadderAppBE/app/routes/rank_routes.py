from flask import request
from app.controllers.rank_controllers import add_initial_rank_controller, get_ranks_controller

def add_initial_rank():
    return add_initial_rank_controller(request)


def get_ranks():
    return get_ranks_controller()