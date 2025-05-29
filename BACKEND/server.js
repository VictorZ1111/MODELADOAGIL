const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..')));
app.use(session({
  secret: 'claveSecreta123',
  resave: false,
  saveUninitialized: true
}));

const uri = 'mongodb+srv://VZFUT:VZFUT@modeladoagil.9qvjbjv.mongodb.net/ADMINISTRADORDB?retryWrites=true&w=majority&appName=MODELADOAGIL';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Atlas conectado'))
  .catch(err => console.error('Error de conexión:', err));


//mongoose.connect('mongodb://localhost:27017/ADMINISTRADORDB', {
//  useNewUrlParser: true,
//  useUnifiedTopology: true
//});

const PersonajeSchema = new mongoose.Schema({
  id: String,
  nombre: String,
  imagen: String,
  habilidades: Array,
  tiros: Array
});
const Personaje = mongoose.model('Personaje', PersonajeSchema);

// POST para agregar personaje
app.post('/api/personajes', async (req, res) => {
  // Puedes quitar la validación de sesión para pruebas
  const nuevo = new Personaje(req.body);
  await nuevo.save();
  res.json({ mensaje: 'Personaje agregado' });
});

// GET para obtener personajes
app.get('/api/personajes', async (req, res) => {
  const personajes = await Personaje.find();
  res.json(personajes);
});

// GET para obtener un personaje por id
app.get('/api/personajes/:id', async (req, res) => {
  const personaje = await Personaje.findOne({ id: req.params.id });
  if (!personaje) {
    return res.json({ error: "No encontrado" });
  }
  res.json(personaje);
});

// Modelo de usuario 
const UsuarioSchema = new mongoose.Schema({
  usuario: String,
  contrasena: String
});
const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Ruta para login
app.post('/login', async (req, res) => {
  const { usuario, contrasena } = req.body;
  const user = await Usuario.findOne({ usuario });
  if (user && user.contrasena === contrasena) {
    req.session.usuario = usuario;
    res.status(200).json({ mensaje: 'Login correcto' });
  } else {
    res.status(401).send('Usuario o contraseña incorrectos');
  }
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
