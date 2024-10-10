from flask import jsonify
from sqlalchemy import func
from datetime import datetime
from app.controllers.rank_controllers import swap_ranks
from app.models import db, User, Rank, Match

def add_challenge_controller(request):
    return "yep"