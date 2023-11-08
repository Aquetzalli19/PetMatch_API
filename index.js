import morgan from 'morgan';
import express from 'express';
const app = express();
//routes
//Example of import : import NameRuta from '/PathRoute'
import user from './routes/users.routes.js'

//Middlewares
import {auth} from './middlewares/auth.js';
import {cors} from './middlewares/cors.js';
import {notFound} from './middlewares/notFound.js';


app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

// Calling services routes
app.use('/user', user)
app.use(auth)


app.use(notFound)


app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...')
})