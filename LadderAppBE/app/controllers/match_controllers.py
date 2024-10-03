from flask import jsonify
from sqlalchemy import func
from datetime import datetime
from app.controllers.rank_controllers import swap_ranks
from app.models import db, User, Rank, Match

def add_match_controller(request):

    player_1_id = request.json["player_1_id"]
    player_2_id = request.json["player_2_id"]
    winner = request.json["winner"]
    score = request.json["score"]
    date = datetime.strptime(request.json["date"], '%d/%m/%Y')

    players_exist = User.query.filter(User.id.in_([player_1_id, player_2_id])).all()

    if len(players_exist) != 2:
        return jsonify({"error": "Unauthorized - One or both players do not exist"}), 401

    winner_id = ""
    if winner == "player_1":
        winner_id = player_1_id
    elif winner == "player_2":
        winner_id = player_2_id

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