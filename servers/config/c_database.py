import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

Base = declarative_base()

_engine = None
_SessionLocal = None


def _env(key: str, default: str) -> str:

    val = os.getenv(key)
    if val is None:
        return default

    txt = val.strip()
    if txt == "" or txt.lower() == "none":
        return default

    return txt

def get_database_url() -> str:
    host = os.getenv("DB_HOST")
    port = os.getenv("DB_PORT")
    user = os.getenv("DB_USER")
    password = os.getenv("DB_PASSWORD")
    name = os.getenv("DB_NAME")

    return f"mysql+pymysql://{user}:{password}@{host}:{port}/{name}"

def init_db() -> None:

    global _engine, _SessionLocal

    if _engine is not None:
        return

    db_url = get_database_url()
    _engine = create_engine(db_url, pool_pre_ping=True)
    _SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=_engine)

    from models import History

    Base.metadata.create_all(bind=_engine)

    print("[INFO] Database engine initialized")


def get_db_session_factory():
    if _SessionLocal is None:
        raise RuntimeError("Database belum di-init. Panggil init_db() dulu.")
    return _SessionLocal
