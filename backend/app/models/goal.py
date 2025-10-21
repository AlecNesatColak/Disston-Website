from sqlalchemy import Column, String, DateTime, Text, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.session import Base
import uuid

class Goal(Base):
    __tablename__ = "goals"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    player_id = Column(UUID(as_uuid=True), ForeignKey("players.id"), nullable=False)
    match_id = Column(UUID(as_uuid=True), ForeignKey("matches.id"), nullable=False)
    assist_id = Column(UUID(as_uuid=True), ForeignKey("players.id"), nullable=True)
    
    # Relationships
    player = relationship("Player", back_populates="goals", foreign_keys=[player_id])
    match = relationship("Match", foreign_keys=[match_id])
    assist_player = relationship("Player", foreign_keys=[assist_id])