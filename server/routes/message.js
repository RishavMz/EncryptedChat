const express = require('express');
const router = express.Router();
const {conn} = require('../database/connection')

router.get('/', (req, res)=>{
    res.send('Got your message. Now get away');
});

module.exports = router;