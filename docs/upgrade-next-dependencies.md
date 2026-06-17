# Actualización técnica del frontend

## Runtime

- Node usado: `24.16.0`
- npm usado: `11.13.0`

## Versiones principales

| Paquete | Antes | Final |
| --- | --- | --- |
| Next.js | `14.2.3` | `16.2.9` |
| React | `18.3.1` | `19.2.7` |
| React DOM | `18.3.1` | `19.2.7` |
| next-intl | `3.15.0` | `4.13.0` |
| Framer Motion | `11.2.10` | `12.40.0` |
| Tailwind CSS | `3.4.4` | `3.4.19` |

Tailwind se mantuvo en la rama 3.x para evitar una migración fuerte a Tailwind 4 y preservar el diseño command center.

## Dependencias actualizadas

- `next`
- `react`
- `react-dom`
- `eslint-config-next`
- `eslint`
- `next-intl`
- `next-themes`
- `framer-motion`
- `lucide-react`
- `react-icons`
- `class-variance-authority`
- `tailwind-merge`
- `postcss`
- `tailwindcss`
- Radix UI: dialog, scroll-area, select, slot, tabs y tooltip

## Dependencias eliminadas

Se eliminaron paquetes sin imports activos en el frontend actual:

- `@nextui-org/react`
- `@react-three/drei`
- `@react-three/fiber`
- `swiper`

También se retiraron componentes legacy desconectados:

- `components/StarBackground.jsx`
- `components/WorkSliderBtns.jsx`

## Cambios de migración

- `next lint` fue reemplazado por `eslint .`.
- `.eslintrc.json` fue reemplazado por `eslint.config.mjs`.
- `middleware.js` fue renombrado a `proxy.js` para Next 16.
- `i18n.js` fue ajustado a `requestLocale` y ahora devuelve `locale`, requerido por next-intl 4.
- Se reemplazó el patrón de `setMounted` en efectos por `useSyncExternalStore` para cumplir reglas modernas de React Hooks.
- Se ajustó la autocarga del token del panel privado para evitar setState síncrono dentro de efectos.

## Problemas encontrados

- `eslint-config-next@16.2.9` requiere ESLint `>=9`, por eso el primer intento con ESLint 8 falló.
- `eslint@10.5.0` provocó un error interno con la configuración actual de Next; se usó `eslint@9.39.4` por estabilidad.
- Paquetes legacy de NextUI/R3F/Swiper generaban conflictos de peer dependencies con React 19.
- Tailwind 4 aparece como latest, pero no se migró para evitar reescritura de configuración y CSS.

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run build
```
