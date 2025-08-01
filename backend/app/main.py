from fastapi import FastAPI
from fastapi import APIRouter
from fastapi.middleware.cors import CORSMiddleware

from app.db.session import engine, Base
from app.api.routes import auth, player

app = FastAPI(
    title="Sunday League API",
    version="1.0.0"
)

# Allow frontend (Next.js) during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Automatically create tables from SQLAlchemy models
Base.metadata.create_all(bind=engine)

# Register all API routes
router = APIRouter()
router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(player.router, prefix="/players", tags=["players"])

# Include the router in the app
app.include_router(router)