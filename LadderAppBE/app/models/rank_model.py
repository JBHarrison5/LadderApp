from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from datetime import datetime
from app.models import db
from app.models.helpers import get_uuid


class Rank(db.Model):
    __tablename__ = "ranks"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    rank = db.Column(db.Integer, nullable=False)
    player_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable=False)
    is_current_rank = db.Column(db.Boolean, nullable=False, default=True)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    date_changed = db.Column(db.DateTime)