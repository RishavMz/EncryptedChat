const express = require('express');
const router = express.Router();
const rsa = require('node-rsa');
const User = require('../models/users');

router.post('/register', async(req, res) => {
    if(req.body.username==null && req.body.firstname==null && req.body.lastname==null && req.body.password==null && req.body.email==null){
        res.status(400);
        res.send('Incomplete data');
    }
    const keys = new rsa();
    keys.generateKeyPair();
    const privatekey = keys.exportKey('private');
    const publickey = keys.exportKey('public');
    const user = new User({
        username:  req.body.username ,
        firstname: req.body.firstname ,
        lastname:  req.body.lastname ,
        email:     req.body.email ,
        password:  req.body.password,
        publicKey: publickey,
        privateKey: privatekey
    });
    try{
        await user.save();
        res.status(201);
        res.send("Success");
    } catch (err) {
        console.log(err)
        res.status(500);
        res.send(err);
    }
});

router.post('/login', async(req, res) => {
    if(req.body.username==null || req.body.password==null){
        req.status(400);
        res.send('Incomplete data');
    }
    try {
        const userData = await User.findOne({username: req.body.username, password: req.body.password});
        if(userData === null){
            res.status(200);
            res.send('Cannot find user');
        } else {
            res.status(200);
            res.send(userData);
        }
    } catch(err) {
        console.log(err)
        res.status(500);
        res.send('Cannot find user1');
    }
});

router.post('/logout', (req, res) => {
    res.status(200);
    res.send("No session Involved here, nothing to destroy");
});

module.exports = router;