from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from app.db.session import Base

class MatchPerformance(Base):
    __tablename__ = "match_performances"

    id = Column(Integer, primary_key=True, index=True)
    player_id = Column(UUID(as_uuid=True), ForeignKey("players.id"), nullable=True)

    match_id = Column(UUID(as_uuid=True), ForeignKey("matches.id"), nullable=False)

    goals = Column(Integer, default=0)
    assists = Column(Integer, default=0)
    minutes_played = Column(Integer, default=0)
    yellow_cards = Column(Integer, default=0)
    red_cards = Column(Integer, default=0)
    rating = Column(Float, nullable=True)
