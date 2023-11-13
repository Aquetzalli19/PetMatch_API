const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.post('/roles', (req, res) => {

  console.log('Nuevo rol creado');
  res.send("Creado");
});

app.post('/users', (req, res) => {
    console.log('Nuevo usuario Creado') 
});

app.post('/pets', (req, res) => {

    console.log('Nueva mascota agregada')
});

app.post('/pet_commentaries', (req, res) => {
  console.log('Nuevo comentario creado')
});

app.post('/posts', (req, res) => {

    console.log('Nuevo Post creado ')
});

app.post('/preferences', (req, res) => {
    console.log('Nuevas preferencias creadas')  
});

app.post('/matchs', (req, res) => {

    console.log('Nuevo match')
    res.send('Nuevo mactych')
});
