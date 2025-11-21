from uuid import uuid4

from sqlalchemy import Column, String, Enum, DateTime, JSON, func

from config.c_database import Base


class History(Base):
    
    __tablename__ = "history"
    id = Column(String(191), primary_key=True, default=lambda: str(uuid4()))

    file_path = Column(String(30), nullable=False)

    prediction = Column(
        Enum("A", "B", "C", name="grade"),
        nullable=False,
    )

    probability = Column(JSON, nullable=False)

    created_at = Column(
        "createdAt",
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at = Column(
        "updatedAt",
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    def __repr__(self) -> str:
        return f"<History id={self.id} prediction={self.prediction}>"
