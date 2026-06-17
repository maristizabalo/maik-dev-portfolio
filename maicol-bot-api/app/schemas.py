from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str
    service: str


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1200)


class ChatResponse(BaseModel):
    answer: str
