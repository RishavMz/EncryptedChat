const express = require('express');
const router = express.Router();
const { conn } = require('../database/connection');

router.post('/register', (req, res) => {
    res.status(201);
    res.send("Registered");
});

router.post('/login', (req, res) => {
    res.status(200);
    res.send("Logged In");
});

router.post('/logout', (req, res) => {
    res.status(200);
    res.send("Logged Out");
});


module.exports = router;