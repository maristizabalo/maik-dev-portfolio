from app.services.guardrail_service import GuardrailService
from app.services.knowledge_service import KnowledgeService


class ChatService:
    def __init__(self) -> None:
        self.guardrails = GuardrailService()
        self.knowledge = KnowledgeService()

    def answer(self, message: str) -> str:
        if not self.guardrails.is_allowed(message):
            return self.guardrails.out_of_scope_response()

        context = self.knowledge.read_topic(message)
        if not context:
            return "Tengo informacion inicial sobre Maicol Aristizabal, pero ese tema necesita ampliarse en la base de conocimiento."

        return (
            "Respuesta inicial basada en la base local de Maicol Bot:\n\n"
            f"{context}\n\n"
            "Nota: esta version aun no usa un proveedor de IA real; el servicio queda preparado para integrarlo despues."
        )
