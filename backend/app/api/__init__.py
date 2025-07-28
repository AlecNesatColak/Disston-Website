from fastapi import APIRouter
from app.api.routes import player

router = APIRouter()
router.include_router(player.router, prefix="/players", tags=["Players"])
