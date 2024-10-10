from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user_model import User
from .rank_model import Rank
from .match_model import Match
from .challenge_model import Challenge