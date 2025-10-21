from uuid import UUID
from fastapi import APIRouter
from app.schemas.admin import UpdatePlayerStats
from app.db.deps import get_db
from sqlalchemy.orm import Session
from fastapi import Depends
from app.models.player import Player
from datetime import datetime
from fastapi import HTTPException

router = APIRouter()

@router.get("/admin/")
def get_admin():
    return {"message": "Hello, World!"}


@router.put("/admin/update-player-stats/{player_id}")
def update_player_stats(player_id: UUID, player_stats: UpdatePlayerStats, db: Session = Depends(get_db)):
    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    
    player.goals = player_stats.goals
    player.assists = player_stats.assists
    if (player.position != "GK" or player.position != "LB" or player.position != "RB" or player.position != "CB") and player_stats.clean_sheets != 0:
        raise HTTPException(status_code=400, detail="Player is not a goalkeeper or defender, clean sheets cannot be updated")
    else:
        player.clean_sheets = player_stats.clean_sheets

    player.appearances = player_stats.appearances
    player.yellow_cards = player_stats.yellow_cards
    player.red_cards = player_stats.red_cards
    player.updated_at = datetime.now()

    db.commit()
    db.refresh(player)

    return player

