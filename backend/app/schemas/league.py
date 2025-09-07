from uuid import UUID
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from app.schemas.enums.league_enum import LeagueTypeEnum


class LeagueBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    league_type: LeagueTypeEnum
    season: str = Field(..., min_length=1, max_length=20)
    division: Optional[str] = Field(None, max_length=100)
    is_active: int = Field(1, ge=0, le=1)


class LeagueCreate(LeagueBase):
    pass


class LeagueUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    league_type: Optional[LeagueTypeEnum] = None
    season: Optional[str] = Field(None, min_length=1, max_length=20)
    division: Optional[str] = Field(None, max_length=100)
    is_active: Optional[int] = Field(None, ge=0, le=1)


class League(LeagueBase):
    id: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class LeagueWithTeams(League):
    teams: List["Team"] = []
    standings: List["LeagueStandings"] = []


class TeamBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    league_id: UUID
    is_active: int = Field(1, ge=0, le=1)


class TeamCreate(TeamBase):
    pass


class TeamUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    league_id: Optional[UUID] = None
    is_active: Optional[int] = Field(None, ge=0, le=1)


class Team(TeamBase):
    id: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class TeamWithStandings(Team):
    standings: Optional["LeagueStandings"] = None


class LeagueStandingsBase(BaseModel):
    league_id: UUID
    team_id: UUID
    matches_played: int = Field(0, ge=0)
    wins: int = Field(0, ge=0)
    draws: int = Field(0, ge=0)
    losses: int = Field(0, ge=0)
    goals_for: int = Field(0, ge=0)
    goals_against: int = Field(0, ge=0)
    goal_difference: int = Field(0)
    points: int = Field(0, ge=0)
    position: Optional[int] = Field(None, ge=1)


class LeagueStandingsCreate(LeagueStandingsBase):
    pass


class LeagueStandingsUpdate(BaseModel):
    matches_played: Optional[int] = Field(None, ge=0)
    wins: Optional[int] = Field(None, ge=0)
    draws: Optional[int] = Field(None, ge=0)
    losses: Optional[int] = Field(None, ge=0)
    goals_for: Optional[int] = Field(None, ge=0)
    goals_against: Optional[int] = Field(None, ge=0)
    goal_difference: Optional[int] = None
    points: Optional[int] = Field(None, ge=0)
    position: Optional[int] = Field(None, ge=1)


class LeagueStandings(LeagueStandingsBase):
    id: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class LeagueStandingsWithTeam(LeagueStandings):
    team: Team


# Update forward references
LeagueWithTeams.model_rebuild()
TeamWithStandings.model_rebuild()
LeagueStandingsWithTeam.model_rebuild()
