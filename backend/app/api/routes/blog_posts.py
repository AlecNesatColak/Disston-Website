from http.client import HTTPException
from app.deps.auth import get_current_user
from app.models.user import User
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.deps import get_db
from app.models.blog_posts import Post
from app.schemas.blog_posts import BlogPostCreate, BlogPostRead, BlogPostUpdate, BlogPostList


router = APIRouter()


@router.post("/create", response_model=BlogPostRead)
def create_blog_post(
    post: BlogPostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_post = Post(**post.dict(), author_id=current_user.id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@router.get("/", response_model=BlogPostList)
def list_blog_posts(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 10
):
    posts = db.query(Post).offset(skip).limit(limit).all()
    total = db.query(Post).count()
    validated_posts = [BlogPostRead.model_validate(p, from_attributes=True) for p in posts]
    return BlogPostList(posts=validated_posts, total=total)

@router.get("/{post_id}", response_model=BlogPostRead)
def read_blog_post(
    post_id: str,
    db: Session = Depends(get_db)
):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

@router.put("/{post_id}", response_model=BlogPostRead)
def update_blog_post(
    post_id: str,
    post: BlogPostUpdate,
    db: Session = Depends(get_db)
):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    for key, value in post.dict(exclude_unset=True).items():
        setattr(db_post, key, value)
    
    db.commit()
    db.refresh(db_post)
    return db_post

@router.delete("/{post_id}", response_model=BlogPostRead)
def delete_blog_post(
    post_id: str,
    db: Session = Depends(get_db)
):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    db.delete(db_post)
    db.commit()
    return db_post