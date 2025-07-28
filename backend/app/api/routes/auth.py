from app.deps.auth import get_current_user
from app.models.user import User
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.deps import get_db
from app.schemas.user import UserCreate, UserRead, TokenResponse, UserLogin
from app.services.user_service import create_user
from app.services.auth_service import authenticate_user


router = APIRouter()

@router.post("/register", response_model=UserRead)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    user = create_user(db, user)
    return user

@router.post("/login", response_model=TokenResponse)
def login_user(login_data: UserLogin, db: Session = Depends(get_db)):
    token, user = authenticate_user(db, login_data)
    return {"access_token": token, "user": user}

@router.get("/me", response_model=UserRead)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user