from sqlalchemy import Column, String, DateTime, Text, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.session import Base
import uuid

class Post(Base):
    __tablename__ = "posts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)  # can be markdown or plain text
    content = Column(Text, nullable=True)  # optional longer form content

    is_published = Column(Boolean, default=False)
    published_at = Column(DateTime, nullable=True)

    thumbnail_url = Column(String, nullable=True)  # optional media

    author_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)

    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

    author = relationship("User", back_populates="posts")
