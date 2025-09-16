from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from datetime import datetime

from app.db.session import get_db
from app.models.match_new import Match
from app.schemas.match import (
    MatchCreate, MatchUpdate, Match as MatchSchema,
    MatchWithTeams, MatchWithTeamsAndLeague
)

router = APIRouter()


# Match endpoints
@router.post("/matches/", response_model=MatchSchema)
def create_match(match: MatchCreate, db: Session = Depends(get_db)):
    db_match = Match(**match.dict())
    db.add(db_match)
    db.commit()
    db.refresh(db_match)
    return db_match


@router.get("/matches/", response_model=List[MatchWithTeamsAndLeague])
def get_matches(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    matches = db.query(Match).offset(skip).limit(limit).all()
    return matches


@router.get("/matches/league/{league_id}", response_model=List[MatchWithTeamsAndLeague])
def get_matches_by_league(league_id: UUID, db: Session = Depends(get_db)):
    matches = db.query(Match).filter(Match.league_id == league_id).order_by(Match.match_date.asc()).all()
    return matches


@router.get("/matches/team/{team_id}", response_model=List[MatchWithTeamsAndLeague])
def get_matches_by_team(team_id: UUID, db: Session = Depends(get_db)):
    matches = db.query(Match).filter(
        (Match.home_team_id == team_id) | (Match.away_team_id == team_id)
    ).order_by(Match.match_date.asc()).all()
    return matches


@router.get("/matches/upcoming", response_model=List[MatchWithTeamsAndLeague])
def get_upcoming_matches(limit: int = 10, db: Session = Depends(get_db)):
    now = datetime.now()
    matches = db.query(Match).filter(
        Match.away_team_id == "e58059d6-5b63-4f65-bb65-0c7e36ceb132" or Match.home_team_id == "e58059d6-5b63-4f65-bb65-0c7e36ceb132",
        Match.match_date >= now,
        Match.status == "SCHEDULED"
    ).order_by(Match.match_date.asc()).limit(limit).all()
    return matches


@router.get("/matches/recent", response_model=List[MatchWithTeamsAndLeague])
def get_recent_matches(limit: int = 10, db: Session = Depends(get_db)):
    now = datetime.now()
    matches = db.query(Match).filter(
        Match.away_team_id == "e58059d6-5b63-4f65-bb65-0c7e36ceb132" or Match.home_team_id == "e58059d6-5b63-4f65-bb65-0c7e36ceb132",
        Match.match_date < now,
        Match.status == "COMPLETED"
    ).order_by(Match.match_date.desc()).limit(limit).all()
    return matches


@router.get("/matches/{match_id}", response_model=MatchWithTeamsAndLeague)
def get_match(match_id: UUID, db: Session = Depends(get_db)):
    match = db.query(Match).filter(Match.id == match_id).first()
    if match is None:
        raise HTTPException(status_code=404, detail="Match not found")
    return match


@router.put("/matches/{match_id}", response_model=MatchSchema)
def update_match(match_id: UUID, match: MatchUpdate, db: Session = Depends(get_db)):
    db_match = db.query(Match).filter(Match.id == match_id).first()
    if db_match is None:
        raise HTTPException(status_code=404, detail="Match not found")
    
    update_data = match.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_match, field, value)
    
    db.commit()
    db.refresh(db_match)
    return db_match


@router.delete("/matches/{match_id}")
def delete_match(match_id: UUID, db: Session = Depends(get_db)):
    match = db.query(Match).filter(Match.id == match_id).first()
    if match is None:
        raise HTTPException(status_code=404, detail="Match not found")
    
    db.delete(match)
    db.commit()
    return {"message": "Match deleted successfully"}
