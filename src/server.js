const express = require('express');
const cors = require('cors');

const database = require('./database');
const envs = require('./envs');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.redirect('/users'));
app.use('/users', require('./routes/users'));

app.listen(envs.server.port, () => {
    console.log({ server: 'Server online!' });
});