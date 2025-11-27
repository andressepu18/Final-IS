# Gestor de Tareas

Una aplicación web de gestión de tareas (To-Do List) construida con Next.js 15, TypeScript y Prisma ORM. Esta aplicación demuestra un sistema CRUD completo con una interfaz de usuario moderna y responsiva.

## Características

- ✅ **CRUD Completo**: Crear, Leer, Actualizar y Eliminar tareas
- ✅ **Gestión de Estados**: Tareas activas, completadas y todas en pestañas separadas
- ✅ **Sistema de Prioridades**: Clasificación de tareas por prioridad (Baja, Media, Alta)
- ✅ **Interfaz Responsiva**: Diseño adaptativo para móviles y escritorio
- ✅ **Validaciones**: Validación de datos en frontend y backend
- ✅ **Manejo de Errores**: Gestión adecuada de errores y notificaciones
- ✅ **Informe Técnico**: Documentación detallada del stack y arquitectura utilizados

## Stack Tecnológico

### Frontend
- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS 4
- **Componentes UI**: shadcn/ui (basado en Radix UI)
- **Iconos**: Lucide React
- **Notificaciones**: Sonner

### Backend
- **API Routes**: Next.js API Routes
- **Base de Datos**: SQLite con Prisma ORM
- **ORM**: Prisma Client
- **Arquitectura**: Full-stack monolítico

## Instalación y Configuración

### Requisitos Previos
- Node.js 18 o superior
- npm o yarn

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone <repositorio>
cd gestor-de-tareas
```

2. Instalar las dependencias:
```bash
npm install
```

3. Configurar la base de datos:
```bash
npm run db:push
npm run db:generate
```

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

5. Abrir el navegador en `http://localhost:3000`

## Uso de la Aplicación

### Crear una Nueva Tarea
1. Hacer clic en el botón "Nueva Tarea" en la esquina superior derecha.
2. Completar el formulario con:
   - **Título** (obligatorio): Nombre de la tarea
   - **Descripción** (opcional): Detalles adicionales de la tarea
   - **Prioridad**: Seleccionar entre Baja, Media o Alta
3. Hacer clic en "Crear" para guardar la tarea.

### Gestionar Tareas Existentes
- **Marcar como completada**: Utilizar el checkbox al inicio de cada tarea
- **Editar tarea**: Hacer clic en el icono de edición (lápiz)
- **Eliminar tarea**: Hacer clic en el icono de eliminación (papelera)

### Navegación entre Pestañas
- **Activas**: Muestra todas las tareas pendientes
- **Completadas**: Muestra todas las tareas finalizadas
- **Todas**: Muestra todas las tareas sin filtrar
- **Informe**: Muestra información técnica sobre la aplicación

## Estructura del Proyecto

```
src/
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── route.ts          # GET / POST para tareas
│   │       └── [id]/
│   │           └── route.ts      # GET / PUT / PATCH / DELETE para tareas específicas
│   ├── page.tsx                  # Página principal de la aplicación
│   ├── layout.tsx                # Layout principal
│   └── globals.css               # Estilos globales
├── components/
│   └── ui/                       # Componentes UI de shadcn/ui
├── hooks/
│   ├── use-mobile.ts             # Hook para detectar dispositivos móviles
│   └── use-toast.ts              # Hook para notificaciones
└── lib/
    ├── db.ts                     # Configuración de Prisma Client
    └── utils.ts                  # Utilidades varias
```

## Modelo de Datos

La aplicación utiliza un modelo de datos simple para las tareas:

```typescript
model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  completed   Boolean  @default(false)
  priority    Priority @default(MEDIUM)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}
```

## Endpoints API

La aplicación expone los siguientes endpoints:

### Tareas
- `GET /api/tasks` - Obtener todas las tareas
- `POST /api/tasks` - Crear una nueva tarea

### Tarea Específica
- `GET /api/tasks/[id]` - Obtener una tarea específica
- `PUT /api/tasks/[id]` - Actualizar una tarea completa
- `PATCH /api/tasks/[id]` - Actualizar estado de tarea
- `DELETE /api/tasks/[id]` - Eliminar una tarea

## Scripts Disponibles

- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Construir la aplicación para producción
- `npm run start` - Iniciar servidor de producción
- `npm run lint` - Ejecutar ESLint para verificar código
- `npm run db:push` - Aplicar cambios del esquema a la base de datos
- `npm run db:generate` - Generar Prisma Client

## Contribución

1. Hacer un fork del repositorio
2. Crear una rama para la feature (`git checkout -b feature/nueva-feature`)
3. Hacer commit de los cambios (`git commit -am 'Añadir nueva feature'`)
4. Hacer push a la rama (`git push origin feature/nueva-feature`)
5. Crear un Pull Request
