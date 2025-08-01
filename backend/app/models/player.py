from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.db.session import Base

class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, index=True)

    # Identity
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    position = Column(String, nullable=False)
    jersey_number = Column(Integer)

    # Optional Contact/Social
    email = Column(String, nullable=True)
    phone_number = Column(String, nullable=True)
    profile_image_url = Column(String, nullable=True)

    # Role & Status
    is_captain = Column(Boolean, default=False)
    status = Column(Integer, default=0)

    # Performance Totals (aggregated)
    goals = Column(Integer, default=0)
    assists = Column(Integer, default=0)
    clean_sheets = Column(Integer, default=0)
    appearances = Column(Integer, default=0)
    yellow_cards = Column(Integer, default=0)
    red_cards = Column(Integer, default=0)

    # Lifecycle
    joined_at = Column(DateTime, default=func.now())
    left_at = Column(DateTime, nullable=True)

    # Audit Timestamps
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
