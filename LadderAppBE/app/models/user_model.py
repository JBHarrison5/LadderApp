from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from app.models import db
from app.models.helpers import get_uuid

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)
    firstName = db.Column(db.String(345), nullable=False)
    lastName = db.Column(db.String(345), nullable=False)
    program = db.Column(db.String(255), nullable=False, default="client")
    ranks = db.relationship('Rank', backref='user')
    matches_as_player_1 = db.relationship('Match', foreign_keys="Match.player_1_id", backref='player_1')
    matches_as_player_1 = db.relationship('Match', foreign_keys="Match.player_2_id", backref='player_2')
    matches_as_winner = db.relationship('Match', foreign_keys="Match.winner_id", backref='winner')
