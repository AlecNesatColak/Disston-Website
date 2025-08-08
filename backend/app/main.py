from fastapi import FastAPI
from fastapi import APIRouter
from fastapi.middleware.cors import CORSMiddleware

from app.db.session import engine, Base
from app.api.routes import auth, player, blog_posts

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

# Include the router in the app
app.include_router(router)