from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr

class Settings(BaseSettings):
    # SecretStr masks values in logs so they aren't accidentally exposed
    DATABASE_URL: str
    ACCESS_TOKEN_EXPIRE_MINUTES:int
    SECRET_KEY:str
    ALGORITHM:str

    # Tell Pydantic to read from the .env file
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()