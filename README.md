# NewsExplorer Backend

Backend para la aplicación **NewsExplorer**. API REST que permite gestionar usuarios, autenticación y operaciones para buscar y guardar noticias.

---

## 📋 Características principales

- Registro e inicio de sesión de usuarios con autenticación JWT  
- Manejo de noticias: crear, leer, actualizar y eliminar (CRUD)  
- Integración con base de datos MongoDB  
- Middlewares para seguridad, validaciones y manejo de errores  

---

## 🧰 Tecnologías

- **Node.js**  
- **Express**  
- **MongoDB / Mongoose**  
- **JWT**  
- **Dotenv** para variables de entorno  
- **ESLint** para mantener calidad de código  

---

## 🚀 Instalación y uso

1. Clona este repositorio:

   ```bash
  git clone https://github.com/Jared-Asahel/project_news-Explorer_backend.git

2.	Ingresa al directorio:

cd project_news-Explorer_backend


3.	Instala dependencias:

npm install


4.	Configura variables de entorno (.env):

PORT= tu_puerto
MONGODB_URI= tu_mongodb_uri
JWT_SECRET= tu_clave_secreta


5.	Inicia el servidor:

npm start

O para desarrollo con reinicios automáticos:

npm run dev


⸻

🔗 Rutas principales (Endpoints)

Aquí unos ejemplos de endpoints que ofrece esta API:

Método	Ruta	Descripción
POST	/auth/register	Crear un usuario nuevo
POST	/auth/login	Iniciar sesión y recibir token JWT
GET	/articles	Obtener lista de noticias
POST	/articles	Crear una noticia
DELETE	/articles/:id	Eliminar una noticia por ID

⸻

🛡 Seguridad y validación
	•	Tokens JWT para rutas protegidas
	•	Validaciones de datos en entradas de rutas
	•	Manejo de errores centralizado

⸻

📄 Licencia

Este proyecto está bajo la licencia MIT — ver archivo LICENSE para más detalles.

⸻

🤝 Contribuciones

Bienvenidas contribuciones: si quieres reportar errores o sugerir mejoras, abre un issue o pull request 👍

⸻

✅ Contacto

Para más información o demos, revisa el repositorio completo en GitHub.
