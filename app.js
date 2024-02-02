const express = require('express')
const session= require('express-session')
const axios = require('axios')
const app= express()
const cors = require ('cors')
const usersRoutes = require('./routes/users.js');

app.use(cors())


////////////////////////////////////////////////////////////////////////777

app.use(session({
  secret: 'tu-secreto',
  resave: true,
  saveUninitialized: true,
  cookie:{secure:false}
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',usersRoutes);

////////////////////////////////////////////////////////////////////////////////

app.get('/characters', async (req, res) => {
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        res.json(response.data.results);
    } catch (error) {
        console.error('Error fetching characters:', error.message);
        res.status(500).json({ error: 'Error fetching characters', details: error.message });
    }
});



app.listen(3000, () => {
    console.log('Express está escuchando en el puerto http://localhost:3000');
});