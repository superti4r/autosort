from fastapi import APIRouter

router = APIRouter()


@router.get("/", tags=["Main"])
async def root():
    return {"message": "AutoSort"}


@router.get("/health", tags=["Main"])
async def health_check():
    return {"status": "ok"}
