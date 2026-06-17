# Analítica privada del portafolio

Este sistema registra visitas básicas del portafolio sin Google Analytics ni servicios externos. Guarda ruta visitada, idioma, fecha, hora, referrer, user-agent, dispositivo aproximado, navegador, sistema operativo, país si el proveedor lo entrega y un hash parcial no reversible de IP cuando está disponible.

No guarda IP completa ni datos personales innecesarios.

## Variables de entorno

Crea un `.env.local` basado en `.env.example`:

```env
ANALYTICS_ENABLED=true
ANALYTICS_ADMIN_TOKEN=colocar_un_token_largo_y_secreto
ANALYTICS_SECRET_PATH=mi-panel-privado
```

No subas valores reales al repositorio.

## Acceso

El panel privado vive en:

```text
/private/TU_SECRET_PATH/visits
```

Ejemplo, si `ANALYTICS_SECRET_PATH=mi-panel-privado`:

```text
/private/mi-panel-privado/visits
```

Dentro del panel debes ingresar el valor de `ANALYTICS_ADMIN_TOKEN`. El token se guarda solo en `sessionStorage` del navegador.

## Seguridad

La URL oculta no es seguridad suficiente. El secret path solo evita exposición accidental, pero el token privado es obligatorio para consultar datos.

El endpoint privado requiere el header:

```text
x-analytics-token: TU_ANALYTICS_ADMIN_TOKEN
```

## Almacenamiento actual

La implementación actual usa memoria del proceso para desarrollo local y primeras pruebas. En Vercel/serverless esto no es persistente ni confiable entre reinicios, despliegues o instancias.

## Siguiente paso recomendado

Implementar un adapter persistente con Postgres, Redis o Supabase manteniendo la interfaz:

```js
trackVisit(payload)
getVisits({ limit, page })
getVisitStats()
```

El placeholder de Postgres está en `lib/analytics/adapters/postgres-adapter.js`.
