# Sinergia Frontend

Una aplicación de escritorio multiplataforma construida con Electron, React y TypeScript.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Desarrollo](#desarrollo)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)
- [Construcción](#construcción)
- [Configuración del Entorno](#configuración-del-entorno)
- [Estándares de Código](#estándares-de-código)
- [Arquitectura](#arquitectura)
- [IDE Recomendado](#ide-recomendado)

## 📖 Descripción

Sinergia Frontend es una aplicación de escritorio moderna desarrollada con Electron que combina la potencia de React 19 con TypeScript para ofrecer una experiencia de usuario fluida y multiplataforma. La aplicación utiliza las últimas tecnologías de desarrollo web para crear una interfaz nativa en Windows, macOS y Linux.

## 🚀 Tecnologías

### Core
- **Electron** v38.1.2 - Framework para aplicaciones de escritorio
- **React** v19.1.1 - Biblioteca de UI
- **TypeScript** v5.9.2 - Tipado estático
- **Vite** v7.1.6 - Build tool y dev server

### UI & Styling
- **TailwindCSS** v4.1.14 - Framework CSS utility-first
- **Radix UI** - Componentes accesibles y sin estilos
- **shadcn/ui** - Sistema de componentes reutilizables
- **Lucide React** - Biblioteca de iconos
- **class-variance-authority** - Gestión de variantes de componentes

### Estado y Datos
- **Zustand** v5.0.8 - Gestión de estado global
- **TanStack Query** v5.90.3 - Gestión de estado del servidor y caché
- **Axios** v1.12.2 - Cliente HTTP

### Formularios y Validación
- **React Hook Form** v7.65.0 - Gestión de formularios
- **Zod** v4.1.12 - Validación de esquemas
- **@hookform/resolvers** - Integración de validadores

### Routing
- **React Router** v7.9.4 - Enrutamiento de la aplicación

### Otras Utilidades
- **electron-updater** v6.3.9 - Actualizaciones automáticas
- **sonner** v2.0.7 - Sistema de notificaciones toast

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **pnpm** (gestor de paquetes recomendado)
  ```bash
  npm install -g pnpm
  ```

## 🔧 Instalación

1. Clona el repositorio y navega al directorio del proyecto:
   ```bash
   cd modules/frontend
   ```

2. Instala las dependencias:
   ```bash
   pnpm install
   ```

   Este comando también ejecutará automáticamente `electron-builder install-app-deps` gracias al hook `postinstall`.

## 💻 Desarrollo

### Iniciar el servidor de desarrollo

```bash
pnpm dev
```

Este comando:
- Inicia el servidor de desarrollo de Vite
- Abre la aplicación Electron en modo desarrollo
- Habilita Hot Module Replacement (HMR)
- Permite la inspección con DevTools

### Vista previa de la build

```bash
pnpm start
```

Ejecuta la aplicación usando los archivos compilados sin reconstruir.

## 📁 Estructura del Proyecto

```
modules/frontend/
├── src/
│   ├── main/              # Proceso principal de Electron
│   ├── preload/           # Scripts de preload
│   └── renderer/          # Aplicación React
│       └── src/
│           ├── assets/    # Recursos estáticos (imágenes, estilos)
│           ├── components/# Componentes React reutilizables
│           ├── config/    # Archivos de configuración
│           ├── constants/ # Constantes de la aplicación
│           ├── context/   # Contextos de React
│           ├── hooks/     # Custom hooks
│           ├── layout/    # Componentes de layout
│           ├── lib/       # Utilidades y helpers
│           ├── pages/     # Páginas/vistas de la aplicación
│           ├── routes/    # Configuración de rutas
│           ├── schemas/   # Esquemas de validación Zod
│           ├── services/  # Servicios y llamadas API
│           ├── store/     # Estado global (Zustand)
│           ├── types/     # Definiciones de tipos TypeScript
│           ├── App.tsx    # Componente raíz
│           └── main.tsx   # Punto de entrada
├── build/                 # Recursos para el build
├── dist/                  # Archivos compilados (generado)
├── out/                   # Build de Electron (generado)
├── resources/             # Recursos adicionales para el empaquetado
├── electron.vite.config.ts # Configuración de Electron Vite
├── electron-builder.yml   # Configuración de Electron Builder
├── components.json        # Configuración de shadcn/ui
├── tsconfig.json          # Configuración TypeScript
└── package.json           # Dependencias y scripts
```

### Descripción de Directorios Clave

- **`src/main/`**: Contiene el código del proceso principal de Electron, responsable de la gestión de ventanas y eventos del sistema.
- **`src/preload/`**: Scripts que se ejecutan antes de cargar el renderer, proporcionando APIs seguras para la comunicación entre procesos.
- **`src/renderer/src/`**: La aplicación React completa con toda la lógica de UI y negocio del frontend.

## 📜 Scripts Disponibles

### Desarrollo
- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm start` - Vista previa de la build

### Calidad de Código
- `pnpm lint` - Ejecuta ESLint con caché
- `pnpm format` - Formatea el código con Prettier
- `pnpm typecheck` - Verifica tipos TypeScript (node + web)
- `pnpm typecheck:node` - Verifica tipos solo para Node.js
- `pnpm typecheck:web` - Verifica tipos solo para web

### Build
- `pnpm build` - Compila el proyecto (typecheck + vite build)
- `pnpm build:unpack` - Build sin empaquetar
- `pnpm build:win` - Build para Windows
- `pnpm build:mac` - Build para macOS
- `pnpm build:linux` - Build para Linux

### Otros
- `pnpm prepare` - Configura Husky para git hooks

## 🏗️ Construcción

### Build de Desarrollo

```bash
pnpm build
```

Compila el proyecto y genera los archivos en `dist/` y `out/`.

### Build para Producción

#### Windows
```bash
pnpm build:win
```
Genera un instalador `.exe` para Windows.

#### macOS
```bash
pnpm build:mac
```
Genera un archivo `.dmg` para macOS.

#### Linux
```bash
pnpm build:linux
```
Genera paquetes para distribuciones Linux (AppImage, deb, rpm, etc.).

Los archivos generados se encuentran en el directorio `dist/`.

## ⚙️ Configuración del Entorno

El proyecto soporta múltiples entornos mediante archivos `.env`:

- `.env.development` - Variables para desarrollo
- `.env.staging` - Variables para staging
- `.env.production` - Variables para producción

**Nota**: Los archivos `.env` están en `.gitignore` por seguridad. Crea tus propios archivos basándote en las necesidades del proyecto.

### Variables de Entorno Comunes

```env
# Ejemplo de variables (ajustar según necesidades)
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Sinergia
```

## 🎨 Estándares de Código

### Linting y Formateo

El proyecto utiliza:
- **ESLint** con configuración para TypeScript y React
- **Prettier** para formateo consistente
- **Husky** + **lint-staged** para pre-commit hooks

Los archivos se formatean automáticamente antes de cada commit.

### Configuración de ESLint

Basada en:
- `@electron-toolkit/eslint-config-ts`
- `@electron-toolkit/eslint-config-prettier`
- Reglas específicas para React y React Hooks

### Configuración de Prettier

Definida en `.prettierrc.yaml` con reglas consistentes para todo el equipo.

## 🏛️ Arquitectura

### Proceso Principal (Main)

El proceso principal de Electron gestiona:
- Creación y gestión de ventanas
- Comunicación IPC (Inter-Process Communication)
- Acceso a APIs nativas del sistema operativo
- Actualizaciones automáticas

### Proceso Renderer (React)

La aplicación React maneja:
- Interfaz de usuario
- Lógica de negocio del frontend
- Gestión de estado con Zustand
- Comunicación con APIs mediante TanStack Query

### Comunicación IPC

La comunicación entre procesos se realiza de forma segura mediante:
- Scripts de preload que exponen APIs específicas
- Validación de mensajes entre procesos
- Contexto aislado para mayor seguridad

### Gestión de Estado

- **Estado Local**: React hooks (`useState`, `useReducer`)
- **Estado Global**: Zustand stores
- **Estado del Servidor**: TanStack Query para caché y sincronización

### Routing

React Router v7 maneja la navegación con:
- Rutas definidas en `src/renderer/src/routes/`
- Lazy loading de componentes
- Protección de rutas según autenticación/autorización

## 🛠️ IDE Recomendado

### Visual Studio Code

Extensiones recomendadas:
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Linting en tiempo real
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Formateo automático
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) - Mejor soporte TypeScript

### Configuración de VSCode

El proyecto incluye configuración en `.vscode/` para:
- Formateo automático al guardar
- Integración con ESLint
- Configuración de TypeScript

## 📝 Notas Adicionales

### Actualizaciones Automáticas

La aplicación incluye `electron-updater` configurado para:
- Verificar actualizaciones al iniciar
- Descargar e instalar actualizaciones en segundo plano
- Notificar al usuario cuando hay actualizaciones disponibles

Configuración en `dev-app-update.yml` y `electron-builder.yml`.

### Componentes UI

El proyecto usa **shadcn/ui** con el estilo "new-york". Para agregar nuevos componentes:

```bash
npx shadcn-ui@latest add [component-name]
```

Los componentes se instalan en `src/renderer/src/components/ui/`.

### Path Aliases

El proyecto usa alias de TypeScript para imports más limpios:

```typescript
// En lugar de: import { Button } from '../../../components/ui/button'
import { Button } from '@renderer/components/ui/button'
```

Configurado en `tsconfig.json` y `components.json`.

## 🤝 Contribución

1. Asegúrate de que el código pase todos los checks:
   ```bash
   pnpm lint
   pnpm typecheck
   ```

2. Formatea el código antes de commitear:
   ```bash
   pnpm format
   ```

3. Los hooks de pre-commit ejecutarán automáticamente lint-staged.

## 📄 Licencia

[Especificar licencia del proyecto]

## 👥 Autores

[Especificar autores o equipo de desarrollo]
