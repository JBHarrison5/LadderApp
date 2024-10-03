from flask import jsonify, session
from sqlalchemy import func
from datetime import datetime
from app.models import db, User, Rank

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

def swap_ranks(player_1, player_2, winner):
    if winner == player_1:
        winner_rank_object = Rank.query.filter_by(player_id=player_1, is_current_rank=True).first()
        loser_rank_object = Rank.query.filter_by(player_id=player_2, is_current_rank=True).first()
    else:
        winner_rank_object = Rank.query.filter_by(player_id=player_2, is_current_rank=True).first()
        loser_rank_object = Rank.query.filter_by(player_id=player_1, is_current_rank=True).first()

    if not winner_rank_object or not loser_rank_object:
        raise ValueError("One or both players do not have an current rank")

    winner_old_rank, loser_old_rank = winner_rank_object.rank, loser_rank_object.rank
    if winner_old_rank > loser_old_rank:
        for rank_obj in (winner_rank_object, loser_rank_object):
            rank_obj.is_current_rank = False
            rank_obj.date_changed = datetime.utcnow()

        new_ranks = [
            Rank(rank=loser_old_rank, player_id=winner_rank_object.player_id, is_current_rank=1),
            Rank(rank=winner_old_rank, player_id=loser_rank_object.player_id, is_current_rank=1)
        ]

        db.session.add_all(new_ranks)
        
        try:
            db.session.commit()
        except Exception:
            db.session.rollback()
            print(f"An error occurred: {Exception}")


def get_ranks_controller():

    ranks = [] 

    for rank in Rank.query.filter_by(is_current_rank=True).order_by(Rank.rank):
        person = {
            "player" : rank.user.firstName,
            "rank": rank.rank,
            "id": rank.user.id
        }
        ranks.append(person)

    return jsonify(ranks)

        
def get_ranks_for_user_controller():

    user_id = session.get("user_id")

    player_rank = Rank.query.filter_by(is_current_rank=True, player_id=user_id).first()

    if player_rank:

        # ranks_to_check=[player_rank.rank-5...player_rank.rank+5]
        ranks = Rank.query.filter(Rank.is_current_rank==True).filter(Rank.rank < player_rank.rank+6).filter(Rank.rank > player_rank.rank-6).order_by(Rank.rank)
        
        formatted_ranks = [] 

        for rank in ranks:
            person = {
                "player" : f"{rank.user.firstName} {rank.user.lastName}",
                "rank": rank.rank,
                "id": rank.user.id
            }
            formatted_ranks.append(person)


        return jsonify(formatted_ranks)


    else:
        return jsonify({"error": "User does not have a rank"}), 409