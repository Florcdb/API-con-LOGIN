const express = require('express');
const router = express.Router();
const axios = require('axios')
//const { generateToken, verifyToken } = require('../middlewares/authMiddleware.js');
//const { comparePasswords } = require('../crypto/config.js');

const users = [
  { id: 1, username: 'usuario1', password: 'contraseña1', name: 'Usuario Uno' },
  { id: 2, username: 'usuario2', password: 'contraseña2', name: 'Usuario Dos' },
];

// Ruta de inicio
router.get('/', (req, res) => {
    
  const loginForm = `
    <form action="/login" method="post">
      <label for="username">Usuario:</label>
      <input type="text" id="username" name="username" required><br>

      <label for="password">Contraseña:</label>
      <input type="password" id="password" name="password" required><br>

      <button type="submit">Iniciar sesión</button>
    </form>
    <a href="/dashboard">dashboard</a>
  `;
  res.send(loginForm);
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (user) {
    const passwordMatch = user.password === password;

    if (passwordMatch) {
      const token = generateToken(user);

    
      const decodedUser = verifyToken(token);


      req.session.user = decodedUser;

      return res.redirect(`/character/?name${characterName}`);
      
    }
    console.log(use)
  }


  console.log('Autenticación Fallada');
  return res.status(401).json({ message: 'Credenciales incorrectas' });
});



///////////////////7
router.get('/characters/:characterName', async (req, res) => {
  const user = req.session.user;

  if (user) {
    const characterName = req.params.characterName;
    const url = `https://rickandmortyapi.com/api/character/?name=${characterName}`;


    try {
      const response = await axios.get(url);
      const { name, status, species, gender } = response.data;
      res.json({ name, status, species, gender });
    } catch (error) {
      res.status(404).json({ error: 'Personaje no encontrado' });
    }
  } else {
    res.status(401).json({ message: 'Usuario no encontrado' });
  }
});






// Ruta de cierre de sesión
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;



// Ruta del panel de control
/*
router.get('/dashboard', verifyToken, (req, res) => {
  console.log(req.user);
  const userId = req.user;
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.send(`
      <h1>Bienvenido, ${user.name}!</h1>
      <p>ID: ${user.id}</p>
      <p>Usuario: ${user.username}</p>
      <br>
      <form action="/logout" method="post">
        <button type="submit">Cerrar sesión</button>
      </form>
      <a href="/">home</a>
    `);
  } else {
    res.status(401).json({ message: 'Usuario no encontrado' });
  }
});

*/

/*router.get('/characters', async (req, res) => {


 /* console.log(req.user);
  const userId = req.user;
  const user = users.find((u) => u.id === userId);

  if (user) {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character');
      res.json(response.data.results);
  } catch (error) {
      console.error('Error fetching characters:', error.message);
      res.status(500).json({ error: 'Error fetching characters', details: error.message });
  }
  } else {
    res.status(401).json({ message: 'Usuario no encontrado' });
  }
});


router.get('/characters/:characterName', async (req, res) =>{
  const characterName = req.params.characterName;
  const url = `https://rickandmortyapi.com/api/character/?name=${characterName}`;
})*/