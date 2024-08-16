# grupo3-links

## WeShare!

Proyecto final HACK A BOSS JSB25RT

# APP PARA COMPARTIR ENLACES WEB

Implementar una API que permita a los usuarios registrarse y compartir enlaces web que consideren interesantes. Otros usuarios podrán votarlos si les gustan.

## INSTALAR

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.
2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.
3. Ejecutar `npm run initDb` para crear las tablas necesarias en la BDD creada.
4. Ejecutar `npm run dev` o `npm run start` para lanzar el servidor.

## ENTIDADES

### USERS

| Campo      | Tipo     | Descripción                           |
| ---------- | -------- | ------------------------------------- |
| id         | INT      | Identificador único del usuario.      |
| email      | VARCHAR  | Dirección de correo electrónico.      |
| username   | VARCHAR  | Nombre de usuario.                    |
| password   | VARCHAR  | Contraseña del usuario.               |
| avatar     | VARCHAR  | Nombre y avatar del usuario.          |
| role       | VARCHAR  | Rol del usuario (normal o admin).     |
| created_at | DATETIME | Fecha y hora de creación del usuario. |
| modifiedAt | DATETIME | Fecha y hora de última modificación.  |

---

### NOTES (PUBLICACIONES)

| Campo      | Tipo     | Descripción                            |
| ---------- | -------- | -------------------------------------- |
| id         | INT      | Identificador único de la publicación. |
| user_id    | VARCHAR  | Identificador de quién la publicó.     |
| text       | VARCHAR  | Texto de la publicación                |
| image      | VARCHAR  | Nombre de la imagen adjunta.           |
| created_at | DATETIME | Fecha y hora de creación de la publ.   |

---

### UPVOTES

| Campo      | Tipo     | Descripción                                |
| ---------- | -------- | ------------------------------------------ |
| id         | INT      | Identificador único del voto.              |
| user_id    | VARCHAR  | Identificador de quién dio el voto.        |
| post_id    | VARCHAR  | Identificador de la publ. que recibió voto |
| created_at | DATETIME | Fecha y hora de creación de la publ.       |

---

### ENDPOINTS

### USERS

·POST `/users/register` -> Registro de usuarios.
·POST `/users/login` -> Login de usuario (devuelve token).
·PUT `/users/profile` -> Actualizar el perfil del usuario (editar mail, contraseña, nombre de usuario).
·PUT `/users/avatar` -> Editar el avatar.

### NOTES (PUBLICACIONES)

·POST `/notes`-> Permite crear un enlace.
·GET `/notes` -> Lista de enlaces. Deberá incluir el número de likes y la info del creador como nombre y el avatar (en caso de incluirlo).
·POST `/notes/:post_id/votes` -> Añadir un voto a un enlace de otro usuario.
·DELETE `/notes/:post_id/votes` -> Deshace un voto a un enlace.
·DELETE `/notes/:post_id` -> Borra un enlace solo si eres quien lo compartió.
