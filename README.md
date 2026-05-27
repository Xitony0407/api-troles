# 🧊 API Troles y Gomitas Enchiladas - Documentación Backend

¡Hola equipo! Aquí está el motor del proyecto (Backend + Bases de Datos). Este sistema está construido con NestJS, TypeScript, PostgreSQL y MongoDB. 

Sigan estas instrucciones paso a paso para levantar el servidor en sus computadoras y poder conectar las pantallas del Frontend (React/Angular).

---

## 🛠️ 1. Requisitos Previos
Antes de descomprimir el ZIP, asegúrense de tener instalados estos tres programas en sus máquinas:
1. **Node.js** (Para correr el servidor)
2. **Docker Desktop** (Súper importante: aquí vivirán las bases de datos. Asegúrense de que la aplicación de Docker esté abierta y corriendo en segundo plano).
3. **Postman** o **Thunder Client** (Para probar las rutas antes de conectarlas a la web).

---

## 🚀 2. Cómo levantar el proyecto

Abran la carpeta descomprimida en VS Code, abran la terminal integrada y ejecuten estos comandos en orden:

1. **Instalar dependencias:**
   npm install

2. Levantar las Bases de Datos (PostgreSQL y MongoDB):
   docker compose up -d

3. Encender la API:
   npm run start:dev

## 3. Preparar la base de datos

Como la base de datos nace vacía, no pueden mandar a cobrar una orden si no existen los productos primero. Abran Postman y hagan peticiones POST a http://localhost:3000/ en las siguientes rutas para llenar el menú:

/roles -> 
{ "nombre": "Cliente" }

/usuarios -> 
{ "nombre": "Prueba", "correo": "test@test.com", "contrasena": "123", "rol": { "id_role": 1 } }

/metodos-pago -> 
{ "nombre": "Efectivo" }

/estados-orden -> 
{ "descripcion": "Pendiente" }

/sabores ->
 { "nombre": "Limón", "disponible": true }

/productos-base -> 
{ "nombre": "Trol Clásico", "precio_base": 35.00 }

/toppings ->
 { "nombre": "Panditas", "precio_extra": 10.00, "porcion_gramos": 40 }

 ## 4. Catalogo de Endpoints para el FrontEnd7

 Cualquier pantalla que hagan, se conectará a estas URLs principales. Todas soportan GET (para traer listas) y POST (para crear):

http://localhost:3000/sabores (Para mostrar las tarjetas de sabores)

http://localhost:3000/toppings (Para mostrar el bar de chamoy)

http://localhost:3000/productos-base (Para mostrar los tamaños de los troles)

http://localhost:3000/usuarios (Para su pantalla de registro/login)

## 5. El Flujo Estrella: Confirmar Pedido (Checkout)

Cuando el cliente le dé clic al botón verde de "Confirmar Orden" en su carrito de compras del Frontend, deberán enviar una petición POST a http://localhost:3000/ordenes con la siguiente estructura JSON exacta:

{
  "id_usuario": 1,
  "id_metodo": 1,
  "detalles": [
    {
      "id_producto": 1,
      "id_sabor": 1,
      "toppings": [1]
    }
  ]
}

En detalles, puede haber otro producto si el cliente lo agrego asi

¿Qué hace el backend con esto?
El backend recibe el paquete, valida que los productos existan, calcula el total a pagar de forma segura sumando el costo del vaso más el de las gomitas, inserta los registros en las tablas relacionales y les devolverá un JSON con el folio de la orden generada y el gran total. ¡Ustedes solo tienen que mostrar ese mensaje de éxito en la pantalla!