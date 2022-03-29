const express = require('express');
const user = require('../controllers/users');
const router = express.Router();

const users = require('../controllers/users');

function send(req, res, response) {
    return response.error ? res.status(400).send(response) : res.status(200).send(response);
};

router.get('/', async (req, res) => { // ✔️
    let response = await users.getAll();
    send(req, res, response);
});

router.get('/:user_id', async (req, res) => { // ✔️
    let response = await users.get({
        _id: req.params.user_id
    }); send(req, res, response);
});

router.post('/login', async (req, res) => { // ✔️
    let response = await users.login({
        email: req.body.email,
        password: req.body.password
    }); send(req, res, response);
});

router.post('/create', users.middlewares.authenticated, async (req, res) => { // ✔️
    let response = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }); send(req, res, response);
});

router.put('/:user_id/update', users.middlewares.authenticated, async (req, res) => { // ✔️
    let response = await user.update({
        _id: req.params.user_id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }); send(req, res, response);
});

router.delete('/:user_id/delete', users.middlewares.authenticated, async (req, res) => { // ✔️
    let response = await user.delete({
        _id: req.params.user_id
    }); send(req, res, response);
});

module.exports = router;