from app.schemas.player import PlayerRead
from app.models.player import Player
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.deps import get_db
from app import models, schemas

router = APIRouter()



@router.post("/", response_model=PlayerRead)
def create_player(player: schemas.player.PlayerCreate, db: Session = Depends(get_db)):
    db_player = Player(**player.dict())
    db.add(db_player)
    db.commit()
    db.refresh(db_player)
    return db_player

@router.get("/", response_model=list[PlayerRead])
def get_players(db: Session = Depends(get_db)):
    return db.query(Player).all()