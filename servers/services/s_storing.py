from typing import Any, Dict
from uuid import uuid4
from pathlib import Path

from sqlalchemy.orm import Session

from config.c_database import get_db_session_factory
from models import History


def store_result(
    file_path: str,
    prediction_result: Dict[str, Any],
) -> str:

    label = str(prediction_result.get("label"))
    probability = prediction_result.get("probability")

    if label not in {"A", "B", "C"}:
        raise ValueError(f"Prediction label tidak valid untuk Grade enum: {label}")

    if probability is None:
        probability = {}

    rel_path = file_path
    if len(rel_path) > 30:
        rel_path = Path(file_path).name
        if len(rel_path) > 30:
            rel_path = rel_path[-30:]

    SessionLocal = get_db_session_factory()
    session: Session = SessionLocal()

    try:
        history = History(
            id=str(uuid4()),
            file_path=rel_path,
            prediction=label,
            probability=probability,
        )
        session.add(history)
        session.commit()
        session.refresh(history)

        print(f"[INFO] History tersimpan id={history.id}, prediction={history.prediction}")
        return history.id
    except Exception as e:
        session.rollback()
        print(f"[ERROR] Gagal menyimpan History: {e}")
        raise
    finally:
        session.close()
