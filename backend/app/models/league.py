from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy import Column, Integer, String, DateTime, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.session import Base
import enum


class LeagueTypeEnum(str, enum.Enum):
    SUNCOAST = "SUNCOAST"
    MEXICAN = "MEXICAN"


class League(Base):
    __tablename__ = "leagues"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    
    # League identification
    name = Column(String, nullable=False)  # e.g., "Fall 2025/2026 - Men Second (11v11)"
    league_type = Column(Enum(LeagueTypeEnum), nullable=False)
    season = Column(String, nullable=False)  # e.g., "2025/2026"
    division = Column(String, nullable=True)  # e.g., "Men Second (11v11)"
    
    # League configuration
    is_active = Column(Integer, default=1)  # 1 = active, 0 = inactive
    
    # Audit timestamps
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    # Relationships
    teams = relationship("Team", back_populates="league", cascade="all, delete-orphan")
    standings = relationship("LeagueStandings", back_populates="league", cascade="all, delete-orphan")
    matches = relationship("Match", back_populates="league", cascade="all, delete-orphan")
