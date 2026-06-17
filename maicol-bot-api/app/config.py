from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
KNOWLEDGE_DIR = BASE_DIR / "knowledge"
PROMPTS_DIR = BASE_DIR / "prompts"

OUT_OF_SCOPE_RESPONSE = (
    "Solo puedo ayudarte con informacion sobre Maicol Aristizabal, su experiencia, "
    "proyectos, habilidades y servicios profesionales."
)
