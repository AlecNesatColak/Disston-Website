from app.models.enums.match_enum import MatchLocationEnum
from sqlalchemy import Column, Integer, String, DateTime, Enum
from sqlalchemy.sql import func
import enum
from app.db.session import Base


class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, nullable=False)
    opponent = Column(String, nullable=False)
    location = Column(String, nullable=True)
    home_or_away = Column(Enum(MatchLocationEnum), nullable=False)
    team_score = Column(Integer, nullable=True)
    opponent_score = Column(Integer, nullable=True)

    created_at = Column(DateTime, default=func.now())
