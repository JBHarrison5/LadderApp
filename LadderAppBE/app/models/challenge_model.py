from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from datetime import datetime
from app.models import db
from app.models.helpers import get_uuid

class Challenge(db.Model):
    __tablename__ = "challenges"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    challenger_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable=False)
    challengee_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.String(32), default="Pending")
    match_date_1 = db.Column(db.DateTime)
    match_date_2 = db.Column(db.DateTime)