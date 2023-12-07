import express from 'express';
const  pet = express.Router();
import { getPets, postPet } from '../controller/pets.controller.js';

pet.get('/', getPets);
pet.post('/', postPet);


export default pet;