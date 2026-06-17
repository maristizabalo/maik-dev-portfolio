# Integración de Maicol Bot

## Arquitectura

El flujo queda separado y preparado para despliegue:

```text
Frontend UI -> Next API Proxy -> FastAPI Bot
```

- La UI vive en el frontend Next.js.
- El cliente del navegador llama a `/api/maicol-bot/chat`.
- El proxy interno de Next.js llama al backend Python usando `MAICOL_BOT_API_URL`.
- Si FastAPI está apagado o falla, el proxy responde con fallback local usando datos del portafolio.

## Por qué el backend está separado

El backend Python vive en `C:\portfolio\maicol-bot-api` como proyecto Git independiente para evitar mezclar responsabilidades. El frontend queda enfocado en UI, rutas, animaciones y experiencia visual; el bot queda listo para crecer con IA real, RAG, embeddings o servicios externos sin ensuciar el proyecto Next.js.

## Variables de entorno

Frontend `C:\portfolio\maik-dev-portfolio`:

```env
MAICOL_BOT_API_URL=http://localhost:8000
```

Backend `C:\portfolio\maicol-bot-api`:

```env
BOT_NAME=Maicol Bot
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
DEFAULT_LOCALE=es
```

## Correr ambos proyectos localmente

Backend:

```bash
cd C:\portfolio\maicol-bot-api
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Frontend:

```bash
cd C:\portfolio\maik-dev-portfolio
npm install
npm run dev
```

## Probar

1. Abre `http://localhost:3000/es`.
2. Abre el botón flotante de Maicol Bot.
3. Pregunta: `¿Qué proyectos ha desarrollado?`
4. Si el backend está encendido, el estado muestra `Conectado`.
5. Si el backend está apagado, el estado muestra `Modo local` y responde con fallback del frontend.

## Si el backend está apagado

La UI no se rompe. El proxy de Next.js captura el error y responde con una respuesta local basada en `data/portfolio`. Esto permite desarrollar el frontend sin depender siempre del servidor Python.

## Próximo paso

Integrar un proveedor de IA real o RAG en `C:\portfolio\maicol-bot-api`, manteniendo el contrato:

```json
{
  "answer": "respuesta del bot",
  "allowed": true,
  "source": "local_knowledge"
}
```
