from uuid import UUID
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from app.schemas.enums.match_status_enum import MatchStatusEnum


class MatchBase(BaseModel):
    match_date: datetime
    match_time: Optional[str] = Field(None, max_length=20)
    home_team_id: UUID
    away_team_id: UUID
    league_id: UUID
    venue_name: Optional[str] = Field(None, max_length=200)
    field_name: Optional[str] = Field(None, max_length=200)
    full_location: Optional[str] = Field(None, max_length=300)
    match_type: Optional[str] = Field(None, max_length=100)
    division: Optional[str] = Field(None, max_length=100)
    home_score: Optional[int] = Field(None, ge=0)
    away_score: Optional[int] = Field(None, ge=0)
    status: MatchStatusEnum = MatchStatusEnum.SCHEDULED
    notes: Optional[str] = Field(None, max_length=500)


class MatchCreate(MatchBase):
    pass


class MatchUpdate(BaseModel):
    match_date: Optional[datetime] = None
    match_time: Optional[str] = Field(None, max_length=20)
    home_team_id: Optional[UUID] = None
    away_team_id: Optional[UUID] = None
    league_id: Optional[UUID] = None
    venue_name: Optional[str] = Field(None, max_length=200)
    field_name: Optional[str] = Field(None, max_length=200)
    full_location: Optional[str] = Field(None, max_length=300)
    match_type: Optional[str] = Field(None, max_length=100)
    division: Optional[str] = Field(None, max_length=100)
    home_score: Optional[int] = Field(None, ge=0)
    away_score: Optional[int] = Field(None, ge=0)
    status: Optional[MatchStatusEnum] = None
    notes: Optional[str] = Field(None, max_length=500)


class Match(MatchBase):
    id: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class MatchWithTeams(Match):
    home_team: "Team"
    away_team: "Team"
    league: "League"


class MatchWithTeamsAndLeague(Match):
    home_team: "Team"
    away_team: "Team"
    league: "League"


# Rebuild models after all schemas are loaded
try:
    from app.schemas.team import Team
    from app.schemas.league import League
    MatchWithTeams.model_rebuild()
    MatchWithTeamsAndLeague.model_rebuild()
except ImportError:
    # Schemas not loaded yet, will be rebuilt when imported
    pass
