from flask import jsonify, session
from sqlalchemy import func
from datetime import datetime
from app.models import db, User, Rank
from app import bcrypt

def add_initial_rank_controller(request):
    player_id = request.json["player_id"]

    player = User.query.filter_by(id=player_id).first()

    if player is None:
        return jsonify({"error": "Unauthorized - User does not exist"}), 401

    check_rank = Rank.query.filter_by(player_id=player_id, is_current_rank=1).first() is not None

    if check_rank:
        return jsonify({"error": "Unauthorized - User is already present"}), 401

    rank = db.session.query(func.max(Rank.rank)).scalar() or 0
    new_rank = Rank(rank=rank+1, player_id=player_id, is_current_rank=1)
    db.session.add(new_rank)
    db.session.commit()

    return jsonify({
        "rank_id": new_rank.id,
        "rank": new_rank.rank,
        "player_id": new_rank.player_id
    })

def swap_ranks(player_1, player_2):
    p1_rank_object = Rank.query.filter_by(player_id=player_1, is_current_rank=True).first()
    p2_rank_object = Rank.query.filter_by(player_id=player_2, is_current_rank=True).first()

    if not p1_rank_object or not p2_rank_object:
        raise ValueError("One or both players do not have an current rank")

    p1_old_rank, p2_old_rank = p1_rank_object.rank, p2_rank_object.rank

    for rank_obj in (p1_rank_object, p2_rank_object):
        rank_obj.is_current_rank = False
        rank_obj.date_changed = datetime.utcnow()

    new_ranks = [
        Rank(rank=p2_old_rank, player_id=player_1, is_current_rank=1),
        Rank(rank=p1_old_rank, player_id=player_2, is_current_rank=1)
    ]

    db.session.add_all(new_ranks)
    
    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        print(f"An error occurred: {Exception}")