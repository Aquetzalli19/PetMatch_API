import morgan from 'morgan';
import express from 'express';
const app = express();

// Rutas
import user from './routes/users.routes.js'
import { cors } from './middlewares/cors.js';
import { notFound } from './middlewares/notFound.js';
import Cuestionario from './routes/preferences.routes.js';

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Cuestionario);
app.use('/user', user);
// Aplicar el auth unicamente a logIn





app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...')
});
