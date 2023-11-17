// Importación de paquetes
import morgan from 'morgan';  // Middleware para registrar solicitudes HTTP en consola
import express from 'express'; // Framework de aplicación web para Node.js
import cors from 'cors';       // Middleware para configurar CORS (Cross-Origin Resource Sharing)
import multer from 'multer';   // Middleware para manejar carga de archivos
import path from 'path';       // Módulo para manejar rutas de archivos

// Inicialización de la aplicación Express
const app = express();


// Middlewares utilizados en la aplicación
app.use(cors()); // Habilita CORS para permitir solicitudes desde distintos orígenes
app.use(morgan('dev')); // Registra las solicitudes HTTP en la consola
app.use(express.json()); // Middleware para manejar solicitudes con datos en formato JSON
app.use(express.urlencoded({ extended: true })); // Middleware para manejar solicitudes con datos de formulario



// Configuración de almacenamiento para el manejo de archivos con Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define la carpeta de destino para almacenar las imágenes subidas
        cb(null, path.join(__dirname, "./public/images/uploads"));
    },
    filename: (req, file, cb) => {
        // Define el nombre del archivo subido
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});


// Utiliza Multer con la configuración de almacenamiento definida
app.use(multer({ storage }).single('image')); // Middleware para manejar la carga de una sola imagen


// Importa el middleware 'index' desde el archivo correspondiente para manejar la ruta principal
import { index } from './middlewares/index.js';


// Configuración de rutas
app.get('/', index); // Asocia la ruta principal a la función 'index'


// Inicia el servidor, escuchando en el puerto definido en la variable de entorno o en el puerto 3000 por defecto
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...'); // Mensaje de confirmación al iniciar el servidor
});
