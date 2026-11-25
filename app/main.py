from typing import Annotated

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, StringConstraints

from app.agents.zero import ZeroConfigurationError, ZeroModelError, zero_agent


app = FastAPI(title="Being API")


class ZeroRequest(BaseModel):
    message: Annotated[
        str, StringConstraints(strip_whitespace=True, min_length=1, max_length=10_000)
    ]


class ZeroResponse(BaseModel):
    reply: str


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/agents/zero/invoke", response_model=ZeroResponse)
async def invoke_zero(request: ZeroRequest) -> ZeroResponse:
    try:
        result = await zero_agent.ainvoke({"message": request.message})
    except ZeroConfigurationError:
        raise HTTPException(
            status_code=503, detail="Gemini API key is not configured."
        ) from None
    except ZeroModelError:
        raise HTTPException(
            status_code=502, detail="Gemini did not return a reply."
        ) from None
    return ZeroResponse.model_validate(result)
