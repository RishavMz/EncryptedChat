const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Message = require('../models/messages');

const message=[];

router.get('/', (req, res)=>{
    res.send('Got your message. Now get away');
});

router.post('/publickey', async(req, res)=>{
    if(req.body.username==null){
        res.status(400);
        res.send('Incomplete data');
    }
    try {
        const data = await User.find({username: req.body.username})[0].publicKey;
        req.status(200);
        req.send(data);
    } catch(err) {
        req.status(500);
        res.send("Error")
    }
});

router.post('/message', async(req, res)=>{
    if(req.body.username===null || req.body.receiver===null || req.body.message===null){
        res.status(400);
        res.send('Incomplete data');
    } else {
        const message1 = new Message({
            message: req.body.message,
            sentByMe: true
        });
        try {
            const messageData = new Message({
                sender: req.body.username,
                receiver: req.body.receiver,
                message: req.body.message
            });
            await messageData.save()
            .then(async(res)=>{
                const messageID = String(res._id);
                await User.updateOne({username: req.body.username}, 
                {
                    $push: {  messages: messageID  }
                }
            )});   
            res.status(200);
            res.send('OK');
        } catch (err) {
            console.log(err)
            res.status(500);
            res.send('Error');
        }
            
            
        
    }
    
});

router.get('/message', (req, res)=>{
    res.send(message);
})

module.exports = router;