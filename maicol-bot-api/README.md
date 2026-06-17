# Maicol Bot API

Proyecto local inicial para el backend de Maicol Bot. Usa FastAPI y responde con informacion basada en archivos Markdown locales. Aun no integra un proveedor de IA real.

## Ejecutar localmente

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Endpoints

- `GET /health`
- `POST /chat`

Ejemplo:

```bash
curl -X POST http://127.0.0.1:8000/chat ^
  -H "Content-Type: application/json" ^
  -d "{\"message\":\"Que proyectos ha desarrollado Maicol?\"}"
```

## Reglas del bot

Maicol Bot solo debe responder sobre Maicol Aristizabal, su experiencia, proyectos, habilidades, servicios profesionales, disponibilidad, contacto y CV.

Si la pregunta es externa, debe responder:

```text
Solo puedo ayudarte con informacion sobre Maicol Aristizabal, su experiencia, proyectos, habilidades y servicios profesionales.
```
