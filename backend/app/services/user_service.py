import email
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import get_password_hash
from fastapi import HTTPException, status

def create_user(db: Session, user: UserCreate) -> User:
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    hashed_pw = get_password_hash(user.password)

    new_user = User(
        email = user.email,
        hashed_password = hashed_pw,
        is_admin = False
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user