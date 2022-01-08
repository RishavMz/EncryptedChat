const express = require('express');
const router = express.Router();
const {conn} = require('../database/connection')

const message=[];

router.get('/', (req, res)=>{
    res.send('Got your message. Now get away');
});

router.post('/publickey', async(req, res)=>{
    await conn.query(`SELECT KEYDATA FROM PUBLIC_KEYS WHERE USER_ID=(SELECT ID FROM USERS WHERE USERNAME='${req.body.username}' LIMIT 1)`, async(error, result)=>{
        if(error){
            throw error;
        } else {
            return result[0].KEYDATA;
        }
    });
});

router.post('/message', (req, res)=>{
    message.push(req.body.message);
    res.send('OK');
})

router.get('/message', (req, res)=>{
    res.send(message);
})

module.exports = router;