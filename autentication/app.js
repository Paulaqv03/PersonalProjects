
//Invocamos express
const express = require('express');
const app = express();
//invocamos dotenv
const dotenv = require('dotenv')
dotenv.config({path:'./env/.env'})
//invocamos a bycriptjs
const bycriptjs = require('bcryptjs')
//variable  de sesion
const sesssion = require('express-session');
app.use(sesssion({
    secret: 'secret',
    resave: true,
    saveUnimitialized: true
}));

//Seteamos urlencoded para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//motor de plantilla
app.use('view engine', 'ejs');

console.log(__dirname);

app.get('/', (req, res)=>{
   res.send('Hola mundo');
});

app.listen(3000, (req, res) => {
    console.log("SERVER RUNNING IN http://localhost:3000");
});