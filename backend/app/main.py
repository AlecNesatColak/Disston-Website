from fastapi import FastAPI
from fastapi import APIRouter
from fastapi.middleware.cors import CORSMiddleware

from app.db.session import engine, Base
from app.api.routes import auth, player, blog_posts, league, match, admin

# Import all models so SQLAlchemy can create tables
from app.models import league as league_model
from app.models import team as team_model  
from app.models import league_standings as league_standings_model
from app.models import match_new as match_model

app = FastAPI(
    title="Disston API",
    version="1.0.0"
)

# Allow frontend (Next.js) during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://disston-website.vercel.app", "https://disston.vercel.app"],  # Frontend dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Automatically create tables from SQLAlchemy models
Base.metadata.create_all(bind=engine)

# Register all API routes
router = APIRouter()

@router.get("/health")
def health_check():
    return "Distton is healthy"

router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(player.router, prefix="/players", tags=["players"])
router.include_router(blog_posts.router, prefix="/blog-posts", tags=["blog-posts"])
router.include_router(league.router, prefix="/api", tags=["league"])
router.include_router(match.router, prefix="/api", tags=["match"])
router.include_router(admin.router, prefix="/api", tags=["admin"])

# Include the router in the app
app.include_router(router)