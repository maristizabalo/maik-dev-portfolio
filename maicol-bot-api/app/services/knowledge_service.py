from app.config import KNOWLEDGE_DIR


class KnowledgeService:
    topic_files = {
        "proyecto": "projects.md",
        "proyectos": "projects.md",
        "experiencia": "experience.md",
        "habilidad": "skills.md",
        "habilidades": "skills.md",
        "stack": "skills.md",
        "servicio": "services.md",
        "servicios": "services.md",
        "contacto": "contact.md",
        "cv": "contact.md",
        "disponibilidad": "contact.md",
        "maicol": "maicol_profile.md",
        "aristizabal": "maicol_profile.md",
    }

    def read_topic(self, message: str) -> str:
        normalized = message.lower()
        filenames = {
            filename
            for keyword, filename in self.topic_files.items()
            if keyword in normalized
        }

        if not filenames:
            filenames = {"maicol_profile.md", "projects.md", "skills.md"}

        return "\n\n".join(self._read_file(filename) for filename in sorted(filenames))

    def _read_file(self, filename: str) -> str:
        path = KNOWLEDGE_DIR / filename
        if not path.exists():
            return ""
        return path.read_text(encoding="utf-8").strip()
