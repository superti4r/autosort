from fastapi import APIRouter
from services.s_logs import get_latest_logs

router = APIRouter()


@router.get("/")
async def logs_list(limit: int = 100):
    logs = await get_latest_logs(limit=limit)
    return {"logs": logs}
