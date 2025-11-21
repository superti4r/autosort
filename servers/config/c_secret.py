import os
import secrets
from pathlib import Path


def generate_app_key(length: int = 32) -> str:
    return secrets.token_hex(length)


def ensure_app_key(env_path: str | None = None) -> None:
    if os.getenv("APP_KEY"):
        return

    key = generate_app_key()
    print("[INFO] APP_KEY belum ada. Membuat APP_KEY baru.")

    if env_path is None:
        env_path = Path(__file__).resolve().parents[1] / ".env"

    env_path = Path(env_path)

    if env_path.exists():
        text = env_path.read_text(encoding="utf-8")
        if "APP_KEY=" in text:
            text = text.replace("APP_KEY=", f"APP_KEY={key}")
        else:
            text += f"\nAPP_KEY={key}\n"
    else:
        text = f"APP_KEY={key}\n"

    env_path.write_text(text, encoding="utf-8")

    os.environ["APP_KEY"] = key
