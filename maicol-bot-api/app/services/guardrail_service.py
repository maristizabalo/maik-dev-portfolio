from app.config import OUT_OF_SCOPE_RESPONSE


class GuardrailService:
    allowed_terms = {
        "maicol",
        "aristizabal",
        "experiencia",
        "proyecto",
        "proyectos",
        "habilidad",
        "habilidades",
        "stack",
        "servicio",
        "servicios",
        "disponibilidad",
        "contacto",
        "cv",
        "backend",
        "frontend",
        "full stack",
        "trabajo",
        "portafolio",
        "tecnologia",
        "tecnologias",
    }

    def is_allowed(self, message: str) -> bool:
        normalized = message.lower()
        return any(term in normalized for term in self.allowed_terms)

    def out_of_scope_response(self) -> str:
        return OUT_OF_SCOPE_RESPONSE
