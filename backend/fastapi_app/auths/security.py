from datetime import datetime,timedelta,timezone
import jwt
from fastapi.security import OAuth2PasswordBearer
from fastapi_app.config import settings

oauth2_scheme=OAuth2PasswordBearer(
    tokenUrl="/api/auth/login"
)

def create_access_token(user_id:int):
    expire=datetime.now(timezone.utc) +timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload={
        "sub":str(user_id),
        "exp":expire
    }
    token=jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )
    return token


