from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.session import Base


class Team(Base):
    __tablename__ = "teams"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    
    # Team identification
    name = Column(String, nullable=False)  # e.g., "Disston City Soccer Club"
    
    # League relationship
    league_id = Column(UUID(as_uuid=True), ForeignKey("leagues.id"), nullable=False)
    
    # Team status
    is_active = Column(Integer, default=1)  # 1 = active, 0 = inactive
    
    # Audit timestamps
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    # Relationships
    league = relationship("League", back_populates="teams")
    standings = relationship("LeagueStandings", back_populates="team", cascade="all, delete-orphan")
    home_matches = relationship("Match", foreign_keys="Match.home_team_id", back_populates="home_team")
    away_matches = relationship("Match", foreign_keys="Match.away_team_id", back_populates="away_team")
