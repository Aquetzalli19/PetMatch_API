import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadImage } from '../controller/imagesPosts.controller.js';

const imgPet = express.Router();

// Obtener la ruta del directorio actual usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images/uploads/imagesPosts'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});

// Middleware para manejar la carga de una sola imagen
const upload = multer({ storage }).single('image');

// Ruta POST para subir una imagen
imgPet.post('/', upload, uploadImage);

export default imgPet;
