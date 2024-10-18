from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
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

    @validates('status')
    def validate_status(self, key, status):
        valid_statuses = ["Accepted - Date 1", 
                          "Accepted - Date 2", 
                          "Rejected - Date", 
                          "Rejected", 
                          "Complete", 
                          "Pending"
                        ]
        if status not in valid_statuses:
            raise ValueError("Challenge Status Type Is Invalid")
        return status