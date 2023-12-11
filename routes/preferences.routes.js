import express from 'express';
import { createPreferences, updatePreferences } from '../controller/preferences.controller.js';
//Prefernces funcionando como routeers
const Cuestionario = express.Router();
Cuestionario.post('/createPreferences', createPreferences);
Cuestionario.patch('/updatePreferences', updatePreferences);


//Exportacion de router
export default Cuestionario;
