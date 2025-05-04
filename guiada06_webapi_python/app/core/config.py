from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PORT: int
    DB_NAME: str
    DB_USERNAME: str
    DB_PASSWORD: str
    DB_PORT: int
    DB_HOST: str

    class Config:
        env_file: str = ".env"

settings = Settings()