# Guía de integración con Supabase

Esta guía te lleva desde una base de datos vacía hasta el sitio funcionando en producción. Síguela paso a paso; cada comando es copiable tal cual.

> El sitio funciona **sin Supabase** (el asistente responde con su base de conocimiento local y la analítica simplemente no guarda nada). Supabase activa: analítica, guardado de conversaciones del chat, formulario de contacto y el panel privado.

---

## 1. Dónde encontrar tus credenciales

En el panel de Supabase (https://supabase.com/dashboard), abre tu proyecto y ve a:

- **Project URL**: `Settings` → `Data API` → campo **Project URL**. Ej: `https://xxxx.supabase.co`
- **anon key**: `Settings` → `API Keys` → **anon public**
- **service_role key**: `Settings` → `API Keys` → **service_role** (secreta; solo servidor)

---

## 2. SQL listo para pegar

Abre `SQL Editor` → `New query`. El archivo `supabase/schema.sql` de este repo contiene todo. Puedes pegarlo completo de una vez, o por bloques en este orden:

1. **Bloque 1** — Extensiones (`pgcrypto`)
2. **Bloque 2** — Tablas
3. **Bloque 3** — Índices
4. **Bloque 4** — RLS y revocación de permisos
5. **Bloque 5** — Vistas agregadas
6. **Bloque 6** — Funciones (`get_overview`, `rollup_daily`, `purge_raw_data`)
7. **Bloque 7** — Programación de tareas (opcional, solo si tu proyecto tiene `pg_cron`)

Pega el contenido de `supabase/schema.sql` y pulsa **Run**.

---

## 3. Cómo verificar que se ejecutó bien

- Cada bloque debe terminar con **"Success. No rows returned"**.
- Ve a `Table Editor`: deberías ver 9 tablas (`visitors`, `sessions`, `page_views`, `events`, `chat_conversations`, `chat_messages`, `contact_submissions`, `daily_rollups`, `ai_reports`).
- Ve a `Database` → `Functions`: deberías ver `get_overview`, `rollup_daily`, `purge_raw_data`.

---

## 4. Cómo comprobar que RLS está funcionando

En `SQL Editor`, ejecuta como rol `anon`:

```sql
set role anon;
select * from public.contact_submissions limit 1;
reset role;
```

Debe devolver un **error de permiso** (`permission denied`). Si devuelve filas o vacío sin error, revisa que ejecutaste el Bloque 4.

---

## 5. Variables de entorno en `.env.local`

Crea un archivo `.env.local` en la raíz del repo (copia `.env.example`) y completa:

```
NEXT_PUBLIC_SITE_URL=https://mjaris.vercel.app
SUPABASE_URL=<Project URL del paso 1>
SUPABASE_SERVICE_ROLE_KEY=<service_role key del paso 1>
NEXT_PUBLIC_SUPABASE_URL=<Project URL del paso 1>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key del paso 1>
ANALYTICS_SALT=<cualquier cadena larga y aleatoria>
ANALYTICS_ENABLED=true
CONSOLE_PATH=console
CONSOLE_PASSWORD_HASH=<lo generas en el paso 6>
CONSOLE_JWT_SECRET=<otra cadena larga y aleatoria>
CONSOLE_SESSION_HOURS=12
CRON_SECRET=<otra cadena larga y aleatoria>
```

Para el asistente de IA (opcional, tiene costo de tokens en tu cuenta):

```
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=<tu key de Anthropic>
AI_MODEL=claude-3-5-sonnet-latest
```

Para notificar los contactos por correo (opcional):

```
RESEND_API_KEY=<tu key de Resend>
CONTACT_NOTIFY_EMAIL=maristizabalo95@gmail.com
```

---

## 6. Generar el hash de tu contraseña del panel

```
node scripts/hash-password.mjs "tu-contraseña-secreta"
```

Copia la salida (formato `salt:hash`) y pégala en `CONSOLE_PASSWORD_HASH`.

---

## 7. Cargar las variables en Vercel

En el panel de Vercel: `Settings` → `Environment Variables`. Añade **cada** variable de `.env.local`, marcando los entornos **Production**, **Preview** y **Development**.

- Las que empiezan por `NEXT_PUBLIC_` son públicas.
- El resto (`SUPABASE_SERVICE_ROLE_KEY`, `CONSOLE_*`, `ANALYTICS_SALT`, `CRON_SECRET`, `*_API_KEY`) son **secretas**: no las compartas.

---

## 8. Probar en local

```
npm install
npm run dev
```

Abre `http://localhost:3000/es`:

- Navega y desliza: en Supabase → `Table Editor` → `sessions` y `page_views` deberían aparecer filas.
- Abre el asistente (botón inferior derecho) y escribe una pregunta: aparecerá en `chat_messages`.
- Envía el formulario de `/es/contact`: aparecerá en `contact_submissions`.

---

## 9. Configurar el cron de agregación

- **Con pg_cron** (si tu proyecto lo tiene): descomenta el Bloque 7 de `supabase/schema.sql` y ejecútalo.
- **Con Vercel Cron** (plan Hobby, recomendado): ya está configurado en `vercel.json` (corre a las 05:15 UTC). Vercel llama a `/api/cron/rollup` con `Authorization: Bearer $CRON_SECRET`. Solo asegúrate de tener `CRON_SECRET` en Vercel.

---

## 10. Verificar tras el despliegue

1. Entra a tu dominio de producción y navega un poco.
2. Entra a `https://tu-dominio/console/login`, ingresa la contraseña → deberías ver el panel con datos.
3. Envía el formulario de contacto → míralo aparecer en la tabla "Formulario de contacto" del panel.
4. Habla con el asistente → revisa las métricas de "Asistente IA" en el panel.

---

## 11. Solución de problemas (los 8 más probables)

1. **El panel no muestra datos** → falta `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` en Vercel, o no ejecutaste el Bloque 6 (`get_overview`).
2. **`permission denied` al navegar el sitio** → normal para `anon`; el sitio usa la `service_role` en el servidor. Verifica que la service_role esté bien copiada.
3. **El login del panel siempre falla** → `CONSOLE_PASSWORD_HASH` mal copiado o `CONSOLE_JWT_SECRET` vacío.
4. **`/console` da 404** → si cambiaste `CONSOLE_PATH`, renombra también la carpeta `src/app/console`.
5. **El asistente responde siempre lo mismo (fallback)** → falta `AI_PROVIDER` + la key correspondiente.
6. **El formulario dice error** → revisa que la tabla `contact_submissions` exista y la service_role esté configurada.
7. **Analítica sin datos** → `ANALYTICS_ENABLED` está en `false`, o el navegador tiene "Do Not Track" activo (se respeta a propósito).
8. **El cron no corre** → confirma `CRON_SECRET` en Vercel y que `vercel.json` está en la raíz.

---

## 12. Consultar tus datos a mano

En `SQL Editor`:

```sql
select count(*) from public.sessions;
select * from public.contact_submissions order by created_at desc limit 20;
select public.get_overview((now() - interval '30 days')::date, now()::date);
```

---

## 13. Advertencia sobre la pausa por inactividad

Los proyectos gratuitos de Supabase se **pausan tras ~1 semana sin actividad**. Con tráfico real no debería pasar. Para verificar: entra al panel de Supabase; si aparece "Project paused", pulsa **Restore**. Puedes evitarlo con una consulta ligera periódica o simplemente entrando de vez en cuando.
