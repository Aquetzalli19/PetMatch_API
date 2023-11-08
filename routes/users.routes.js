import express from 'express';
const user = express.Router();
import { getUser, singInUser, loginUser } from "../controllers/users.controller.js";

user.get('/', getUser);
user.post('/singIn', singInUser);
user.post('/logIn', loginUser);
user.post


export default user;