from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.session import Base
import enum


class MatchStatusEnum(str, enum.Enum):
    SCHEDULED = "SCHEDULED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    POSTPONED = "POSTPONED"
    CANCELLED = "CANCELLED"


class Match(Base):
    __tablename__ = "matches"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    
    # Match identification
    match_date = Column(DateTime, nullable=False)
    match_time = Column(String, nullable=True)  # e.g., "9:00 AM", "11:00 AM"
    
    # Teams
    home_team_id = Column(UUID(as_uuid=True), ForeignKey("teams.id"), nullable=False)
    away_team_id = Column(UUID(as_uuid=True), ForeignKey("teams.id"), nullable=False)
    
    # League relationship
    league_id = Column(UUID(as_uuid=True), ForeignKey("leagues.id"), nullable=False)
    
    # Location
    venue_name = Column(String, nullable=True)  # e.g., "puryear park"
    field_name = Column(String, nullable=True)  # e.g., "puryear park field 1"
    full_location = Column(String, nullable=True)  # Combined venue + field
    
    # Match details
    match_type = Column(String, nullable=True)  # e.g., "Regular Season"
    division = Column(String, nullable=True)  # e.g., "men second (11v11)"
    
    # Scores (for completed matches)
    home_score = Column(Integer, nullable=True)
    away_score = Column(Integer, nullable=True)
    
    # Status
    status = Column(Enum(MatchStatusEnum), default=MatchStatusEnum.SCHEDULED)
    
    # Additional info
    notes = Column(String, nullable=True)
    
    # Audit timestamps
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    # Relationships
    league = relationship("League", back_populates="matches")
    home_team = relationship("Team", foreign_keys=[home_team_id], back_populates="home_matches")
    away_team = relationship("Team", foreign_keys=[away_team_id], back_populates="away_matches")
