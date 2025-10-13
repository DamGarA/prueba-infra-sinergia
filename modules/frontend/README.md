# Estructura de carpetas

Breve guía de la estructura de `src/` para orientar el desarrollo.

## Árbol resumido de `src/`

```text
src/
  App.tsx
  main.tsx
  vite-env.d.ts
  adapters/
  assets/
  components/
  config/
  constants/
  context/
  data/
  hooks/
  layout/
  pages/
  routes/
  schemas/
  services/
  store/
  styles/
  types/
  utils/
```

## Descripción breve

- **`App.tsx` y `main.tsx`**: Entrada y raíz de la app React.

- **`adapters/`**: Mapeos/transformaciones entre API y modelos de UI.

- **`assets/`**: Recursos estáticos (imágenes, SVGs, etc.).

- **`components/`**: Componentes compartidos (UI, iconos, header, etc.). Nota: en la carpeta UI sólo se almacenan los componentes de la UI de Shadcn.

- **`config/`**: Archivos de configuración de entorno y cliente API (`api.ts`, `env.tsx`). En el archivo `env.tsx` puedes configurar las validaciones de las variables de entorno.

- **`constants/`**: Constantes globales y enums.

- **`context/`**: React Context providers (sesión, rutas protegidas).

- **`data/`**: Datos estáticos (p.ej., `meta.json`).

- **`hooks/`**: Hooks reutilizables (cookies, local storage, ...).

- **`layout/`**: Layouts de páginas (App, Auth).

- **`pages/`**: Páginas enroutables (home, profile, auth, 404).

- **`routes/`**: Config y helpers de routing (`index.tsx`, `paths.tsx`).

- **`schemas/`**: Esquemas de validación (login, sign-up).

- **`services/`**: Lógica de comunicación con backend (auth, sesión).

- **`store/`**: Estados globales centralizados (p.ej., `session.ts`).

- **`styles/`**: Estilos globales (`globals.css`).

- **`types/`**: Tipos globales (`*.d.ts`).

- **`utils/`**: Utilidades y helpers (formatters, errores, cookies, ...).

Nota: Al momento de realizar un commit se correrá de forma automática un pre-commit para corregir errores de linting y también se realizará el build para verificar que la app se pueda compilar.

Nota: Puedes ejecutar `npm run lint` para detectar y corregir errores de linting.
