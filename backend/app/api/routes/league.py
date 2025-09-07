from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.db.session import get_db
from app.models.league import League
from app.models.team import Team
from app.models.league_standings import LeagueStandings
from app.schemas.league import (
    LeagueCreate, LeagueUpdate, League as LeagueSchema,
    TeamCreate, TeamUpdate, Team as TeamSchema,
    LeagueStandingsCreate, LeagueStandingsUpdate, LeagueStandings as LeagueStandingsSchema,
    LeagueStandingsWithTeam
)

router = APIRouter()


# League endpoints
@router.post("/leagues/", response_model=LeagueSchema)
def create_league(league: LeagueCreate, db: Session = Depends(get_db)):
    db_league = League(**league.dict())
    db.add(db_league)
    db.commit()
    db.refresh(db_league)
    return db_league


@router.get("/leagues/", response_model=List[LeagueSchema])
def get_leagues(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    leagues = db.query(League).offset(skip).limit(limit).all()
    return leagues


@router.get("/leagues/{league_id}", response_model=LeagueSchema)
def get_league(league_id: UUID, db: Session = Depends(get_db)):
    league = db.query(League).filter(League.id == league_id).first()
    if league is None:
        raise HTTPException(status_code=404, detail="League not found")
    return league


@router.put("/leagues/{league_id}", response_model=LeagueSchema)
def update_league(league_id: UUID, league: LeagueUpdate, db: Session = Depends(get_db)):
    db_league = db.query(League).filter(League.id == league_id).first()
    if db_league is None:
        raise HTTPException(status_code=404, detail="League not found")
    
    update_data = league.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_league, field, value)
    
    db.commit()
    db.refresh(db_league)
    return db_league


@router.delete("/leagues/{league_id}")
def delete_league(league_id: UUID, db: Session = Depends(get_db)):
    league = db.query(League).filter(League.id == league_id).first()
    if league is None:
        raise HTTPException(status_code=404, detail="League not found")
    
    db.delete(league)
    db.commit()
    return {"message": "League deleted successfully"}


# Team endpoints
@router.post("/teams/", response_model=TeamSchema)
def create_team(team: TeamCreate, db: Session = Depends(get_db)):
    # Verify league exists
    league = db.query(League).filter(League.id == team.league_id).first()
    if league is None:
        raise HTTPException(status_code=404, detail="League not found")
    
    db_team = Team(**team.dict())
    db.add(db_team)
    db.commit()
    db.refresh(db_team)
    return db_team


@router.get("/teams/", response_model=List[TeamSchema])
def get_teams(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    teams = db.query(Team).offset(skip).limit(limit).all()
    return teams


@router.get("/teams/league/{league_id}", response_model=List[TeamSchema])
def get_teams_by_league(league_id: UUID, db: Session = Depends(get_db)):
    teams = db.query(Team).filter(Team.league_id == league_id).all()
    return teams


@router.get("/teams/{team_id}", response_model=TeamSchema)
def get_team(team_id: UUID, db: Session = Depends(get_db)):
    team = db.query(Team).filter(Team.id == team_id).first()
    if team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    return team


@router.put("/teams/{team_id}", response_model=TeamSchema)
def update_team(team_id: UUID, team: TeamUpdate, db: Session = Depends(get_db)):
    db_team = db.query(Team).filter(Team.id == team_id).first()
    if db_team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    
    update_data = team.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_team, field, value)
    
    db.commit()
    db.refresh(db_team)
    return db_team


@router.delete("/teams/{team_id}")
def delete_team(team_id: UUID, db: Session = Depends(get_db)):
    team = db.query(Team).filter(Team.id == team_id).first()
    if team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    
    db.delete(team)
    db.commit()
    return {"message": "Team deleted successfully"}


# League Standings endpoints
@router.post("/standings/", response_model=LeagueStandingsSchema)
def create_standings(standings: LeagueStandingsCreate, db: Session = Depends(get_db)):
    # Verify league and team exist
    league = db.query(League).filter(League.id == standings.league_id).first()
    if league is None:
        raise HTTPException(status_code=404, detail="League not found")
    
    team = db.query(Team).filter(Team.id == standings.team_id).first()
    if team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    
    db_standings = LeagueStandings(**standings.dict())
    db.add(db_standings)
    db.commit()
    db.refresh(db_standings)
    return db_standings


@router.get("/standings/league/{league_id}", response_model=List[LeagueStandingsWithTeam])
def get_standings_by_league(league_id: UUID, db: Session = Depends(get_db)):
    standings = db.query(LeagueStandings).filter(
        LeagueStandings.league_id == league_id
    ).join(Team).order_by(LeagueStandings.position.asc()).all()
    return standings


@router.get("/standings/{standings_id}", response_model=LeagueStandingsSchema)
def get_standings(standings_id: UUID, db: Session = Depends(get_db)):
    standings = db.query(LeagueStandings).filter(LeagueStandings.id == standings_id).first()
    if standings is None:
        raise HTTPException(status_code=404, detail="Standings not found")
    return standings


@router.put("/standings/{standings_id}", response_model=LeagueStandingsSchema)
def update_standings(standings_id: UUID, standings: LeagueStandingsUpdate, db: Session = Depends(get_db)):
    db_standings = db.query(LeagueStandings).filter(LeagueStandings.id == standings_id).first()
    if db_standings is None:
        raise HTTPException(status_code=404, detail="Standings not found")
    
    update_data = standings.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_standings, field, value)
    
    db.commit()
    db.refresh(db_standings)
    return db_standings


@router.delete("/standings/{standings_id}")
def delete_standings(standings_id: UUID, db: Session = Depends(get_db)):
    standings = db.query(LeagueStandings).filter(LeagueStandings.id == standings_id).first()
    if standings is None:
        raise HTTPException(status_code=404, detail="Standings not found")
    
    db.delete(standings)
    db.commit()
    return {"message": "Standings deleted successfully"}
