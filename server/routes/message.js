const express = require('express');
const router = express.Router();
const {conn} = require('../database/connection')

const message=[];

router.get('/', (req, res)=>{
    res.send('Got your message. Now get away');
});

router.post('/publickey', async(req, res)=>{
    if(req.body.username==null){
        res.status(400);
        res.send('Incomplete data');
    }
    await conn.query(`SELECT ID FROM USERS WHERE USERNAME='${req.body.username}'`, async(error, result)=>{
        if(error){
            throw error;
        } else {
            const UserID = result[0].ID;
            await conn.query(`SELECT KEYDATA FROM PUBLIC_KEYS WHERE USER_ID=${UserID}`, async(error, result)=>{
                if(error){
                    throw error;
                } else {
                    res.send(result[0].KEYDATA);
                }
            });
        }
    });
});

router.post('/message', (req, res)=>{
    if(req.body.senderusername==null || req.body.receiverusername==null || req.body.senderdata==null || req.body.receiverdata==null){
        res.status(400);
        res.send('Incomplete data');
    }
    res.status(200);
    res.send('OK');
});

router.get('/message', (req, res)=>{
    res.send(message);
})

module.exports = router;