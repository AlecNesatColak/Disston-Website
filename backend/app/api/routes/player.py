import datetime
from uuid import UUID
from app.schemas.player import PlayerRead, PlayerRosterInfo
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

@router.get("/active-players", response_model=list[PlayerRead])
def get__active_players(db: Session = Depends(get_db)):
    return db.query(Player).filter(Player.status == 1).all()

@router.get("/roster", response_model=list[PlayerRead])
def get_roster(db: Session = Depends(get_db)):
    return db.query(Player).filter(Player.status == 1).orderBy(Player.goals.desc() and Player.assists.desc()).all()

@router.delete("/{player_id}", response_model=PlayerRead)
def delete_player(player_id: UUID, db: Session = Depends(get_db)):
    db_player = db.query(Player).filter(Player.id == player_id).first()
    if not db_player:
        raise HTTPException(status_code=404, detail="Player not found")
    db.delete(db_player)
    db.commit()
    return db_player


@router.get("/requests", response_model=list[PlayerRead])
def get_roster(db: Session = Depends(get_db)):
    return db.query(Player).filter(Player.status == 2).all()

@router.put("/{player_id}/approve", response_model=PlayerRead)
def approve_player(player_id: UUID, db: Session = Depends(get_db)):
    db_player = db.query(Player).filter(Player.id == player_id).first()
    if not db_player:
        raise HTTPException(status_code=404, detail="Player not found")
    db_player.status = 1
    db_player.joined_at = datetime.datetime.now()
    db.commit()
    db.refresh(db_player)
    return db_player

@router.delete("/{player_id}/reject", response_model=PlayerRead)
def reject_player(player_id: UUID, db: Session = Depends(get_db)):
    db_player = db.query(Player).filter(Player.id == player_id).first()
    if not db_player:
        raise HTTPException(status_code=404, detail="Player not found")
    db.delete(db_player)
    db.commit()
    return db_player



@router.get("/roster", response_model=list[PlayerRosterInfo])
def get_roster(db: Session = Depends(get_db)):
    return db.query(Player).filter(Player.status == 1).all()