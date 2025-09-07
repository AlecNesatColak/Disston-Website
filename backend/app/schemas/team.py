from uuid import UUID
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


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
