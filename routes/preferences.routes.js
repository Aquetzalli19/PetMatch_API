import express from 'express';
import { postData, updatePreferences } from '../controller/preferences.controller.js';
//Prefernces funcionando como routeers
const Cuestionario = express.Router();
Cuestionario.post('/', postData);
Cuestionario.patch('/updatePreferences', updatePreferences);


//Exportacion de router
export default Cuestionario;
