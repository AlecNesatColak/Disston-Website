from pydantic import BaseModel, Field, EmailStr, model_validator
from typing import Optional
from datetime import datetime
from app.schemas.enums.position_enum import PositionEnum

class PlayerBase(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=50)
    last_name: str = Field(..., min_length=1, max_length=50)
    position: PositionEnum
    jersey_number: Optional[int] = Field(None, ge=0, le=99)  # max 2-digit jersey numbers

    email: Optional[EmailStr] = None
    phone_number: Optional[str] = Field(None, min_length=7, max_length=20)  # allow digits + optional formatting
    profile_image_url: Optional[str] = Field(None, max_length=500)  # enforce a sane URL limit

    is_captain: bool = False
    is_active: bool = True

    goals: int = Field(0, ge=0)
    assists: int = Field(0, ge=0)
    clean_sheets: Optional[int] = Field(None, ge=0)
    appearances: int = Field(0, ge=0)
    yellow_cards: int = Field(0, ge=0)
    red_cards: int = Field(0, ge=0)

    joined_at: Optional[datetime] = None
    left_at: Optional[datetime] = None

    @model_validator(mode="after")
    def check_clean_sheets_for_gk(self):
        if self.position in (PositionEnum.GK, PositionEnum.CB, PositionEnum.LB, PositionEnum.RB):
            if self.clean_sheets is None:
                self.clean_sheets = 0
        else:
            if self.clean_sheets not in (None, 0):
                raise ValueError("Clean sheets must be null or 0 for non-goalkeepers.")
            self.clean_sheets = None
        return self


class PlayerCreate(PlayerBase):
    pass


class PlayerRead(PlayerBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True
