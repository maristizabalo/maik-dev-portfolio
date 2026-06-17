from fastapi import FastAPI

from app.schemas import ChatRequest, ChatResponse, HealthResponse
from app.services.chat_service import ChatService

app = FastAPI(
    title="Maicol Bot API",
    description="API local inicial para responder preguntas sobre Maicol Aristizabal.",
    version="0.1.0",
)

chat_service = ChatService()


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok", service="maicol-bot-api")


@app.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest) -> ChatResponse:
    return ChatResponse(answer=chat_service.answer(payload.message))
