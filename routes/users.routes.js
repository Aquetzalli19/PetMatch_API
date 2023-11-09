import express from 'express';
const user = express.Router();
import { getUser, signInUser, loginUser } from "../controller/users.controller.js";

user.get('/', getUser);
user.post('/signIn', signInUser);
user.post('/logIn', loginUser);
user.post


export default user;