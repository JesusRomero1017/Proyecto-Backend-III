# Sistema de Inventario

API REST desarrollada con Node.js y Express para la gestion de inventarios en negocios. Permite administrar productos, usuarios y movimientos de stock (entradas y salidas) de forma segura mediante autenticacion con JWT.

---

# Explicacion

Este proyecto consiste en una API REST que permite gestionar un sistema de inventario, incluyendo el control de productos, usuarios y movimientos. Esta disenada bajo buenas practicas de desarrollo backend, utilizando arquitectura MVC y proteccion de rutas.

---

# Justificacion

Muchos negocios pequenos y medianos carecen de herramientas eficientes para gestionar su inventario, lo que provoca errores, perdidas y falta de control. Esta API resuelve ese problema al centralizar la informacion, automatizar procesos y garantizar seguridad en el acceso.

---

# Requisitos Previos

Antes de ejecutar el proyecto, asegurate de tener instalado:

- Node.js (v18 o superior)
- npm (incluido con Node.js)
- MySQL (v8 recomendado)
- Git

---

# Instalacion y Ejecucion

## Clonar el repositorio

```bash
git clone https://github.com/JesusRomero1017/Proyecto-Backend-III.git
cd Proyecto-Backend-III
```

## Instalar dependencias

```bash
npm install
```

## Configurar variables de entorno

Crear un archivo `.env` en la raiz del proyecto usando `.env.example` como referencia.

## Ejecutar el servidor (desarrollo)

```bash
npm run dev
```

## Ejecutar el servidor (produccion)

```bash
npm start
```

## Verificar funcionamiento

Abrir en el navegador:

```txt
http://localhost:3000
```

---

# Variables de Entorno

Ejemplo: `.env.example`

```env
PORT=3000
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=tu_password
MYSQL_DATABASE=inventario_db
JWT_SECRET=supersecreto
```

---

# Requisitos Tecnicos del Proyecto

## Arquitectura

El proyecto sigue el patron MVC (Modelo - Vista - Controlador):

```txt
models/       -> Modelos Sequelize y relaciones
controllers/  -> Logica del negocio
routes/       -> Definicion de endpoints
middlewares/  -> Seguridad y manejo de errores
config/       -> Conexion a MySQL
```

---

## Seguridad

- Autenticacion basada en JWT (JSON Web Tokens)
- Proteccion de rutas mediante middleware
- Encriptacion de contrasenas con bcrypt
- Manejo centralizado de errores

---

## Estilo

- Arquitectura RESTful
- Uso correcto de metodos HTTP:
  - GET -> Obtener datos
  - POST -> Crear
  - PUT -> Actualizar
  - DELETE -> Eliminar
- Respuestas en formato JSON
- Uso de codigos de estado HTTP (200, 201, 400, 401, 404, 500)

---

## Framework y Base de Datos

- Express.js
- MySQL + Sequelize ORM

---

# Documentacion de Endpoints

## Autenticacion

### POST /api/auth/register

Descripcion: Registrar usuario

Body:

```json
{
  "name": "Juan",
  "email": "juan@email.com",
  "password": "123456"
}
```

Respuesta:

```json
{
  "msg": "Usuario creado"
}
```

---

### POST /api/auth/login

Descripcion: Iniciar sesion

Body:

```json
{
  "email": "juan@email.com",
  "password": "123456"
}
```

Respuesta:

```json
{
  "token": "JWT_TOKEN"
}
```

---

## Productos

### GET /api/products

Descripcion: Obtener todos los productos no eliminados.
Headers:

```txt
Authorization: Bearer TOKEN
```

---

### GET /api/products/:id

Descripcion: Obtener producto por ID.

---

### POST /api/products

Descripcion: Crear producto.

Body:

```json
{
  "name": "Laptop",
  "price": 15000,
  "stock": 10
}
```

---

### PUT /api/products/:id

Descripcion: Actualizar producto.

---

### DELETE /api/products/:id

Descripcion: Eliminar producto (soft delete).

---

## Movimientos

### POST /api/movements

Descripcion: Crear movimiento (entrada/salida) y actualizar stock.

Body:

```json
{
  "product": 1,
  "type": "IN",
  "quantity": 5,
  "note": "Compra"
}
```

---

### GET /api/movements

Descripcion: Obtener historial de movimientos.

Opcional query params:

- `type=IN|OUT`
- `productId=ID`

---

# Estructura del Proyecto

```txt
Proyecto-Backend-III/
|
|-- controllers/
|   |-- authController.js
|   |-- productController.js
|   |-- movementController.js
|-- models/
|   |-- User.js
|   |-- Product.js
|   |-- Movement.js
|   |-- index.js
|-- routes/
|   |-- authRoutes.js
|   |-- productRoutes.js
|   |-- movementRoutes.js
|-- middlewares/
|   |-- authMiddleware.js
|   |-- errorMiddleware.js
|-- config/
|   |-- db.js
|-- .env.example
|-- app.js
|-- package.json
```

---

# Autor

Proyecto desarrollado para fines educativos.
