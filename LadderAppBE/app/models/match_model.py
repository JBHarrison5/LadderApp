from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from datetime import datetime
from app.models import db
from app.models.helpers import get_uuid

class Match(db.Model):
    __tablename__ = "matches"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    player_1_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable=False)
    player_2_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable=False)
    winner_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable=False)
    score = db.Column(db.String(32))
    date = db.Column(db.DateTime)
