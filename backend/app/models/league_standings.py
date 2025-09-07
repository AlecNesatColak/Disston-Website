from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.session import Base


class LeagueStandings(Base):
    __tablename__ = "league_standings"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    
    # Relationships
    league_id = Column(UUID(as_uuid=True), ForeignKey("leagues.id"), nullable=False)
    team_id = Column(UUID(as_uuid=True), ForeignKey("teams.id"), nullable=False)
    
    # Match statistics
    matches_played = Column(Integer, default=0)  # MP
    wins = Column(Integer, default=0)  # W
    draws = Column(Integer, default=0)  # D
    losses = Column(Integer, default=0)  # L
    goals_for = Column(Integer, default=0)  # GF
    goals_against = Column(Integer, default=0)  # GA
    goal_difference = Column(Integer, default=0)  # GD (calculated field)
    points = Column(Integer, default=0)  # Pts
    
    # Position in league (can be calculated but stored for performance)
    position = Column(Integer, nullable=True)
    
    # Audit timestamps
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    # Relationships
    league = relationship("League", back_populates="standings")
    team = relationship("Team", back_populates="standings")
