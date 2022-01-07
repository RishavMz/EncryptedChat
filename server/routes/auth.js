const express = require('express');
const router = express.Router();
const rsa = require('node-rsa');
const { conn } = require('../database/connection');

const key = [];

router.post('/register', async(req, res) => {
    const keys = new rsa();
    keys.generateKeyPair();
    const privatekey = keys.exportKey('private');
    const publickey = keys.exportKey('public');
    key.push([privatekey, publickey]);
    res.status(201);
    await res.send([privatekey, publickey]);
});

router.post('/login', (req, res) => {
    res.status(200);
    res.send(key[1]);
});

router.post('/logout', (req, res) => {
    res.status(200);
    res.send("Logged Out");
});

router.get('/test', (req, res)=>{
    const keys = new rsa();
    var data = "This Is A Test";
    console.log("Data: ",data);
    const val = keys.importKey(key[0][1]).encrypt(data, 'base64');
    console.log("Encrypted data: ",val);
    const value = keys.importKey(key[0][0]).decrypt(val, 'utf8');
    console.log("Decrypted data: ", value);
    res.send('done');
})

module.exports = router;