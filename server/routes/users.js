const express = require('express');
const router = new express.Router();
const User = require('../models/users');

router.get('/', async(req, res)=>{
    try
    {
        await User.find({}, {username: 1})
        .then((resp)=>{
            res.status(200);
            res.send(resp);
        });
    } catch(err) {
        console.log(err);
        res.status(500);
        res.send("Error")
    }
});

module.exports = router;