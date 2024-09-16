from flask import jsonify
from sqlalchemy import func
from datetime import datetime
from app.controllers.rank_controllers import swap_ranks
from app.models import db, User, Rank, Match

def add_match_controller(request):

    player_1_id = request.json["player_1_id"]
    player_2_id = request.json["player_2_id"]
    winner_id = request.json["winner_id"]
    score = request.json["score"]
    date = request.json["date"]

    players_exist = User.query.filter(User.id.in_([player_1_id, player_2_id])).all()

    if len(players_exist) != 2:
        return jsonify({"error": "Unauthorized - One or both players do not exist"}), 401

    winner = User.query.filter_by(id=winner_id).first()

    if winner is None:
        return jsonify({"error": "Unauthorized - Winner does not exist"}), 401

    new_match = Match(player_1_id=player_1_id, player_2_id=player_2_id, winner_id=winner_id, score=score, date=date)
    db.session.add(new_match)

    try:
        db.session.commit()
        swap_ranks(player_1_id, player_2_id, winner_id)
        return jsonify({
            "match_id": new_match.id
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500