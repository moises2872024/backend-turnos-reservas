# API REST - Sistema Backend de Turnos y Reservas

## Descripción

API REST desarrollada con Node.js y Express para gestionar el recurso `services` del Sistema Backend de Turnos y Reservas.

Permite consultar, filtrar, crear, actualizar y eliminar servicios mediante endpoints REST, con validación de datos y manejo de errores HTTP.

## Tecnologías

- Node.js
- Express
- dotenv
- JavaScript con módulos ES (ESM)

## Requisitos

- Node.js instalado.
- npm.
- Visual Studio Code (recomendado).

## Instalación

1. Clonar el repositorio:

   ```bash
   git 
   ```

2. Entrar en la carpeta del proyecto:

   ```bash
   cd backend-turnos-reservas
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Crear un archivo `.env` en la raíz del proyecto, tomando como referencia `.env.example`.

   Contenido del archivo `.env`:

   ```env
   PORT=8080
   ```

5. Iniciar el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

   También se puede iniciar en modo normal:

   ```bash
   npm start
   ```

La API estará disponible en:

`http://localhost:8080`

El endpoint principal de servicios es:

`http://localhost:8080/api/services`

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/services` | Obtener todos los servicios |
| GET | `/api/services?category=salud` | Filtrar por categoría |
| GET | `/api/services?available=true` | Filtrar por disponibilidad |
| GET | `/api/services/:sid` | Obtener un servicio por ID |
| POST | `/api/services` | Crear un servicio |
| PUT | `/api/services/:sid` | Actualizar un servicio |
| DELETE | `/api/services/:sid` | Eliminar un servicio |

### Parámetros de consulta

- `category`: filtra los servicios por categoría.
- `available`: filtra por disponibilidad y acepta `true` o `false`.

Ejemplo:

`GET http://localhost:8080/api/services?category=salud&available=true`

### Ejemplo de creación (POST)

Enviar una petición POST a `/api/services` con el siguiente JSON en el cuerpo de la petición:

```json
{
  "name": "Consulta dental",
  "category": "salud",
  "description": "Atención odontológica",
  "price": 20000,
  "available": true
}
```

El identificador (`id`) se genera automáticamente. No es necesario enviarlo en el cuerpo de la petición.

### Ejemplo de actualización (PUT)

Enviar una petición PUT a `/api/services/1` con el siguiente JSON:

```json
{
  "name": "Consulta médica actualizada",
  "category": "salud",
  "description": "Consulta general de salud",
  "price": 18000,
  "available": true
}
```

El identificador del servicio se indica en la URL.

### Ejemplo de eliminación (DELETE)

Enviar una petición DELETE a `/api/services/1`.

El identificador del servicio que se desea eliminar se indica en la URL.

## Códigos HTTP

- `200 OK`: consulta, actualización o eliminación realizada correctamente.
- `201 Created`: servicio creado correctamente.
- `400 Bad Request`: datos o filtros inválidos.
- `404 Not Found`: servicio o ruta no encontrados.
- `500 Internal Server Error`: error interno del servidor.

## Estructura del proyecto

```
src/
├── config/
│   └── env.config.js
├── managers/
│   └── ServiceManager.js
├── routes/
│   └── services.router.js
├── app.js
└── server.js

.env.example
.gitignore
package.json
README.md
```

## Almacenamiento

Los servicios se mantienen en memoria durante la ejecución del servidor. Los cambios realizados se pierden al reiniciarlo.

## Autor

Proyecto académico: Diseño de endpoints REST para servicios.
