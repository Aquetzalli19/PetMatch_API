import morgan from 'morgan';
import express from 'express';
const app = express();
//routes
//Example of import : import NameRuta from '/PathRoute'


//Middlewares
import { index } from './middlewares/index.js';


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

//call routes
app.get('/', index)


app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...')
})