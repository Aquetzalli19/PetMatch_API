import express from 'express';
import { postComents } from '../controller/coments_comunity.controller.js';
//Prefernces funcionando como routeers
const comentarios_comunidad = express.Router();
comentarios_comunidad.post('/Comentarios_Comunidad', postComents);

//Exportacion de router
export default comentarios_comunidad;
