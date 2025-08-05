from uuid import UUID
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, HTTPBearer
from sqlalchemy.orm import Session
from jose import JWTError
from app.db.deps import get_db
from app.core.security import decode_access_token
from app.models.user import User

# Use HTTPBearer instead of OAuth2PasswordBearer for JWT tokens
oauth2_scheme = HTTPBearer()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    
    # Extract token from HTTPBearer
    token_str = token.credentials if hasattr(token, "credentials") else token

    payload = decode_access_token(token_str)
    if not payload or "sub" not in payload:
        raise credentials_exception

    try:
        user_id = UUID(payload["sub"])
    except (ValueError, TypeError):
        raise credentials_exception

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise credentials_exception

    return user

def get_current_admin_user(current_user: User = Depends(get_current_user)) -> User:
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    return current_user
