from pydantic import BaseModel, Field



class UpdatePlayerStats(BaseModel):
    goals: int = Field(..., description="The number of goals scored by the player")
    assists: int = Field(..., description="The number of assists by the player")
    clean_sheets: int = Field(..., description="The number of clean sheets by the player")
    appearances: int = Field(..., description="The number of appearances by the player")
    yellow_cards: int = Field(..., description="The number of yellow cards by the player")
    red_cards: int = Field(..., description="The number of red cards by the player")

    class Config:
        schema_extra = {
            "example": {
                "goals": 10,
                "assists": 5,
                "clean_sheets": 10,
                "appearances": 20,
                "yellow_cards": 2,
                "red_cards": 0
            }
        }

