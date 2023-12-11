// Importación de paquetes
import morgan from 'morgan';  // Middleware para registrar solicitudes HTTP en consola
import express from 'express'; // Framework de aplicación web para Node.js
import cors from 'cors';
import { notFound } from './middlewares/notFound.js';
import session from 'express-session'; 
import path from 'path';
import { auth } from './middlewares/auth.js';      // Middleware para configurar CORS (Cross-Origin Resource Sharing)   
import user from './routes/users.routes.js'
import pets from './routes/pets.routes.js'
import imgPet from './routes/imagesPosts.routes.js';
import posts from './routes/posts.routes.js';
import Cuestionario from './routes/preferences.routes.js';
import posts_communidad from './routes/community_posts.routes.js'
import comentarios_comunidad from './routes/Coments_Comunity.routes.js';
import imgprofile from './routes/imagesProfile.routes.js';



// Inicialización de la aplicación Express
const app = express();


// Middlewares utilizados en la aplicación
app.use(cors()); // Habilita CORS para permitir solicitudes desde distintos orígenes
app.use(morgan('dev')); // Registra las solicitudes HTTP en la consola
app.use(express.json()); // Middleware para manejar solicitudes con datos en formato JSON
app.use(express.urlencoded({ extended: true })); // Middleware para manejar solicitudes con datos de formulario

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  }));

// Importa el middleware 'index' desde el archivo correspondiente para manejar la ruta principal
import { index } from './middlewares/index.js';

// Define el directorio donde se encuentran los archivos estáticos
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.static(path.join(__dirname, 'public')));

// Configuración de rutas
app.get('/', index); // Asocia la ruta principal a la función 'index'

// Rutas

app.use('/user', user)
app.use(auth);
app.use('/pets', pets);
app.use('/uploads', imgPet)
app.use('/posts', posts)
app.use('/imgprofile', imgprofile)
app.use('/preferences', Cuestionario)
app.use('/posts_community', posts_communidad)
app.use('/comments_community', comentarios_comunidad);


// Aplicar el auth unicamente a logIn
app.use(notFound);


// Inicia el servidor, escuchando en el puerto definido en la variable de entorno o en el puerto 3000 por defecto
app.listen(process.env.PORT || 3000, () => {

    console.log('Server is in port 3000')

});
