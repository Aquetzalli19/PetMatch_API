import express from 'express';
import { postData } from '../controller/preferences.controller.js';
//Prefernces funcionando como routeers
const Cuestionario = express.Router();
Cuestionario.post('/preferences', postData);

//Exportacion de router
export default Cuestionario;
