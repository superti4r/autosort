from datetime import datetime
from typing import Optional, Dict

from sqlalchemy.orm import Session
from config.c_database import get_db_session_factory

def count_by_grade(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
) -> Dict[str, int]:
    SessionLocal = get_db_session_factory()
    session: Session = SessionLocal()

    try:

        #logic

        return {"A": 10, "B": 5, "C": 2}
    finally:
        session.close()
