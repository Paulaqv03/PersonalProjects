//Invocamos express
const express = require('express');
const app = express();
//invocamos dotenv
const dotenv = require('dotenv')
dotenv.config({path:'./env/.env'})
//invocamos a bcryptjs
const bcryptjs = require('bcryptjs')
//variable  de sesion
const sesssion = require('express-session');
app.use(sesssion({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Seteamos urlencoded para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//motor de plantilla
app.set('view engine', 'ejs');

console.log(__dirname);

//Usuarios
(async function initializeUsers() {
    users = [
        {
            user: 'usuario1',
            password: await bcryptjs.hash('password1', 8),
            rol: 'user'
        },
        {
            user: 'usuario2',
            password: await bcryptjs.hash('password2', 8),
            rol: 'user'
        }
    ];
    console.log('Usuarios predeterminados inicializados:', users);
})();

//Rutas
app.get('/', (req, res)=>{
   res.render('index', {msg: 'Esto es un mensaje desde node'});
});

app.get('/login', (req, res)=>{
    res.render('login');
 });

 app.get('/register', (req, res)=>{
    res.render('register');
 });

//Registro
app.post('/register', async(req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    const rol = req.body.rol;

    // Verifica si el usuario ya existe
    const userExists = users.find(u => u.user === user);
    if (userExists) {
        return res.send('El usuario ya está registrado.');
    }

    // Agrega el nuevo usuario a la lista
    const passwordHash = await bcryptjs.hash(password, 8);
    users.push({ user, password: passwordHash, rol });

    res.send('Usuario registrado exitosamente.');
    
})

app.listen(3000, (req, res) => {
    console.log("SERVER RUNNING IN http://localhost:3000");
});