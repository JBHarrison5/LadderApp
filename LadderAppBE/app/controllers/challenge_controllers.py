from flask import jsonify
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime
from app.models import db, User, Challenge

def add_challenge_controller(request):
    challenger_id = request.json["challenger_id"]
    challengee_id = request.json["challengee_id"]
    match_date_1 = datetime.strptime(request.json["match_date_1"], '%d/%m/%Y %H:%M')
    match_date_2 = datetime.strptime(request.json["match_date_2"], '%d/%m/%Y %H:%M')

    players_exist = User.query.filter(User.id.in_([challenger_id, challengee_id])).all()

    if len(players_exist) != 2:
        return jsonify({"error": "Unauthorized - One or both players do not exist"}), 401


    new_challenge = Challenge(challenger_id = challenger_id, challengee_id = challengee_id, match_date_1 = match_date_1, match_date_2 = match_date_2)
    db.session.add(new_challenge)

    try:
        db.session.commit()
        return jsonify({
            "challenge_id": new_challenge.id
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

def challenge_reply_controller(request):
    challenge_id = request.json["challenge_id"]
    status = request.json["status"]

    challenge = Challenge.query.get(challenge_id)

    if challenge:
        try:
            challenge.status = status
            db.session.commit()
            return jsonify({
                "challenge_id": challenge.id,
                "message": "Challenge Successfully Updated"
            }), 201

        except ValueError as ve:
            db.session.rollback()
            return jsonify({"error": str(ve)}), 400
    else:
        return "Challenge Does Not Exist", 401
