from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.db.session import Base
from enum import Enum

class PositionEnum(str, Enum):
    ST = "ST"
    LW = "LW"
    RW = "RW"
    CDM = "CDM"
    CM = "CM"
    RM = "RM"
    LM = "LM"
    CAM = "CAM"
    CB = "CB"
    LB = "LB"
    RB = "RB"
    GK = "GK"