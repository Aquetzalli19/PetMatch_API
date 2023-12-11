import express from 'express';
import { postComents, getPostComments } from '../controller/coments_comunity.controller.js';
//Prefernces funcionando como routeers
const comentarios_comunidad = express.Router();

comentarios_comunidad.post('/Comentarios_Comunidad', postComents);
comentarios_comunidad.get('/getPostComments', getPostComments);

//Exportacion de router
export default comentarios_comunidad;
