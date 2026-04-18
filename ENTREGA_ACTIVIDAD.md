# Entrega de Actividad - API Inventario

## 1) Explicacion del Codigo

### Configuracion de Middlewares

- En el arranque de la aplicacion se registran middlewares globales para CORS, parseo JSON y manejo de errores.
- Primero se habilita CORS para permitir solicitudes desde clientes externos.
- Luego se usa el parser JSON para leer cuerpos de peticiones.
- Al final se agregan middlewares de ruta no encontrada (404) y error general (500).

Archivos clave:
- app.js
- middlewares/errorMiddleware.js

### Validacion de JWT

- La validacion del token se realiza en el middleware de autenticacion.
- Se espera el header Authorization con formato Bearer TOKEN.
- Si el header no existe o esta mal formado, responde 401.
- Si el token no es valido, responde 401.
- Si es valido, se guarda la carga decodificada en req.user y la solicitud continua.

Archivo clave:
- middlewares/authMiddleware.js

### Emision del JWT

- El token se genera al iniciar sesion correctamente.
- En login se valida email y password contra la base de datos.
- Si las credenciales son correctas, se firma un JWT con id, email y name del usuario.
- El secreto usado es JWT_SECRET tomado desde el archivo .env.

Archivo clave:
- controllers/authController.js

## 2) Pruebas de Funcionamiento

Herramienta recomendada: Postman o Insomnia.

Base URL:
- http://localhost:3000

### Flujo minimo para demostrar funcionamiento

1. Registrar usuario
   - POST /api/auth/register
   - Resultado esperado: 201 con mensaje de usuario creado.

2. Iniciar sesion
   - POST /api/auth/login
   - Resultado esperado: 200 con token JWT.

3. Crear producto
   - POST /api/products
   - Header: Authorization Bearer TOKEN
   - Resultado esperado: 201 con el producto creado.

4. Consultar productos
   - GET /api/products
   - Header: Authorization Bearer TOKEN
   - Resultado esperado: 200 con listado de productos.

5. Editar producto
   - PUT /api/products/:id
   - Header: Authorization Bearer TOKEN
   - Resultado esperado: 200 con producto actualizado.

6. Eliminar producto (soft delete)
   - DELETE /api/products/:id
   - Header: Authorization Bearer TOKEN
   - Resultado esperado: 200 con mensaje de eliminado.

7. Crear movimiento de entrada o salida
   - POST /api/movements
   - Header: Authorization Bearer TOKEN
   - Resultado esperado: 201 y actualizacion de stock.

8. Consultar historial de movimientos
   - GET /api/movements
   - Header: Authorization Bearer TOKEN
   - Resultado esperado: 200 con historial.

### Pruebas negativas sugeridas

- Acceder a rutas protegidas sin token debe dar 401.
- Enviar token invalido debe dar 401.
- Crear salida OUT con stock insuficiente debe dar 400.
- Consultar o editar producto inexistente debe dar 404.

## 3) Logica de Negocio

### Interaccion entre Controladores y Modelos

1. Autenticacion
   - authController usa el modelo User para buscar y crear usuarios.
   - Password se almacena cifrado con bcrypt.
   - Login compara hash y genera JWT para autorizar rutas protegidas.

2. Productos
   - productController usa el modelo Product para CRUD.
   - El borrado no elimina el registro fisicamente, solo marca isDeleted=true.
   - Las consultas principales filtran por isDeleted=false.

3. Movimientos de inventario
   - movementController usa Movement y Product.
   - Para crear movimiento se inicia una transaccion:
     - Valida tipo IN/OUT y cantidad.
     - Bloquea el producto para evitar condiciones de carrera.
     - Calcula nuevo stock segun el tipo de movimiento.
     - Guarda el movimiento con el usuario autenticado (req.user.id).
   - Si algo falla se revierte la transaccion con rollback.

4. Relaciones en modelos
   - Product tiene muchos Movement.
   - User tiene muchos Movement.
   - Movement pertenece a Product y User.

Archivos clave:
- controllers/authController.js
- controllers/productController.js
- controllers/movementController.js
- models/index.js

## 4) Evidencia Minima a Presentar

Incluye capturas de:
- Register exitoso.
- Login exitoso (token).
- GET products con token.
- POST product.
- PUT product.
- DELETE product.
- POST movement IN y OUT.
- GET movements.
- 401 por ruta protegida sin token.
