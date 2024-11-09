import dotenv from 'dotenv';
dotenv.config();  // Carga las variables de entorno al iniciar

import express from "express";
import cors from "cors"; // Importa el middleware CORS
import usersRoutes from "./routes/users.routes.js";
import morgan from "morgan";
import { PORT } from "./config.js";

const app = express();

// Configuración de CORS
app.use(cors()); // Habilita CORS para todas las rutas y métodos

// Configuración del middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuración de rutas
app.use(usersRoutes);

app.listen(PORT, () => {
  console.log("Server on port", PORT);
});
