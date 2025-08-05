from uuid import UUID
from pydantic import BaseModel, Field, EmailStr, model_validator
from typing import Optional
from datetime import datetime

class BlogPostBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=500)
    content: Optional[str] = Field(None)
    is_published: bool = False
    published_at: Optional[datetime] = None
    thumbnail_url: Optional[str] = Field(None, max_length=500)

class BlogPostCreate(BlogPostBase):
    pass

class BlogPostRead(BlogPostBase):
    id: UUID
    author_id: UUID
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class BlogPostUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=500)
    content: Optional[str] = Field(None)
    is_published: Optional[bool] = None
    published_at: Optional[datetime] = None
    thumbnail_url: Optional[str] = Field(None, max_length=500)

    class Config:
        orm_mode = True

class BlogPostList(BaseModel):
    posts: list[BlogPostRead]
    total: int

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True
