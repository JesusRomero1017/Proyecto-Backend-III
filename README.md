# Sistema de Inventario

API REST desarrollada con Node.js y Express para la gestión de inventarios en negocios. Permite administrar productos, usuarios y movimientos de stock (entradas y salidas) de forma segura mediante autenticación con JWT.

---

# Explicación

Este proyecto consiste en una API REST que permite gestionar un sistema de inventario, incluyendo el control de productos, usuarios y movimientos. Está diseñada bajo buenas prácticas de desarrollo backend, utilizando arquitectura MVC y protección de rutas.

---

# Justificación

Muchos negocios pequeños y medianos carecen de herramientas eficientes para gestionar su inventario, lo que provoca errores, pérdidas y falta de control. Esta API resuelve ese problema al centralizar la información, automatizar procesos y garantizar seguridad en el acceso.

---

# Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

* Node.js (v18 o superior)
* npm (incluido con Node.js)
* MongoDB Atlas (cuenta gratuita) o MongoDB local
* Git

---

# Instalación y Ejecución

## Clonar el repositorio

```bash
git clone https://github.com/JesusRomero1017/Proyecto-Backend-III.git
cd inventario-api
```

## Instalar dependencias

```bash
npm install
```

## Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

##  Ejecutar el servidor

```bash
npm run dev
```

o

```bash
node app.js
```

## Verificar funcionamiento

Abrir en el navegador:

```
http://localhost:3000
```

---

# Variables de Entorno

Ejemplo: `.env.example`

```env
PORT=3000
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/inventario
JWT_SECRET=supersecreto
```

---

# Requisitos Técnicos del Proyecto

## Arquitectura

El proyecto sigue el patrón MVC (Modelo - Vista - Controlador):

```
models/       → Esquemas de datos (MongoDB)
controllers/  → Lógica del negocio
routes/       → Definición de endpoints
middlewares/  → Seguridad y validaciones
```

---

## Seguridad

* Autenticación basada en JWT (JSON Web Tokens)
* Protección de rutas mediante middleware
* Encriptación de contraseñas con bcrypt
* Control de acceso por roles (opcional)

---

## Estilo

* Arquitectura RESTful
* Uso correcto de métodos HTTP:

  * GET → Obtener datos
  * POST → Crear
  * PUT → Actualizar
  * DELETE → Eliminar
* Respuestas en formato JSON
* Uso de códigos de estado HTTP (200, 201, 400, 401, 404, 500)

---

## Framework

* Express.js

---

# Documentación de Endpoints

## Autenticación

### POST /api/auth/register

**Descripción:** Registrar usuario

**Body:**

```json
{
  "name": "Juan",
  "email": "juan@email.com",
  "password": "123456"
}
```

**Respuesta:**

```json
{
  "msg": "Usuario creado"
}
```

---

### POST /api/auth/login

**Descripción:** Iniciar sesión

**Body:**

```json
{
  "email": "juan@email.com",
  "password": "123456"
}
```

**Respuesta:**

```json
{
  "token": "JWT_TOKEN"
}
```

---

## Productos

### GET /api/products

**Descripción:** Obtener todos los productos
**Headers:**

```
Authorization: Bearer TOKEN
```

---

### GET /api/products/:id

**Descripción:** Obtener producto por ID

---

### POST /api/products

**Descripción:** Crear producto

**Body:**

```json
{
  "name": "Laptop",
  "price": 15000,
  "stock": 10
}
```

---

### PUT /api/products/:id

**Descripción:** Actualizar producto

---

### DELETE /api/products/:id

**Descripción:** Eliminar producto (soft delete)

---

## Movimientos

### POST /api/movements

**Descripción:** Crear movimiento (entrada/salida)

**Body:**

```json
{
  "product": "ID_PRODUCTO",
  "type": "IN",
  "quantity": 5,
  "note": "Compra"
}
```

---

### GET /api/movements

**Descripción:** Obtener historial de movimientos

---

# Estructura del Proyecto

```
inventario-api/
│
├── controllers/
├── models/
├── routes/
├── middlewares/
├── config/
├── app.js
├── .env
└── package.json
```

---

# Autor

Proyecto desarrollado para fines educativos.

---
