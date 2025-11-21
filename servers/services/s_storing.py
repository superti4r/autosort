from typing import Any, Dict
from sqlalchemy.orm import Session
from config.c_database import get_db_session_factory


def store_result(
    image_path: str,
    features: Any,
    prediction: Dict[str, Any],
) -> None:
    SessionLocal = get_db_session_factory()
    session: Session = SessionLocal()

    try:

        #logic

        print("[INFO] (dummy) menyimpan hasil ke DB:")
        print(f"  image: {image_path}")
        print(f"  prediction: {prediction}")
    finally:
        session.close()
