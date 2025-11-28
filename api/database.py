from sqlalchemy import create_engine, Column, String, JSON, DateTime, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import uuid
from config import settings

engine = create_engine(settings.DB_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class PredictionHistory(Base):
    __tablename__ = "history"

    id = Column(String(191), primary_key=True, default=lambda: str(uuid.uuid4()))
    file_path = Column(String(30), nullable=False)
    prediction = Column(Enum('A', 'B', 'C', name='grade_enum'), nullable=False)
    probability = Column(JSON, nullable=False)
    createdAt = Column(DateTime(3), default=datetime.now, nullable=False)
    updatedAt = Column(DateTime(3), default=datetime.now, onupdate=datetime.now, nullable=False)

def init_db():
    Base.metadata.create_all(bind=engine)