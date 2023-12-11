import express from 'express';
const user = express.Router();
import { getUser, signInUser, loginUser, configUser, logout } from "../controller/users.controller.js";
import {auth} from "../middlewares/auth.js"

user.get('/', getUser);
user.post('/signIn', signInUser);
user.post('/logIn', loginUser);
user.patch('/configUser', auth, configUser);
user.post('/logout', logout)



export default user;