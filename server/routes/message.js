const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Message = require('../models/messages');
const rsa = require('node-rsa');

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
        console.log(err)
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
            const key1 = new rsa();
            const key2 = new rsa();
            await User.find({username: req.body.username}).then(async(res)=>{
                key1.importKey(res[0].privateKey);
                const data = key1.decrypt(req.body.message, "utf8");
                await User.find({username: req.body.receiver}).then(async(resp)=>{
                    console.log(resp[0], res[0])
                    key2.importKey(resp[0].publicKey);
                    const mdata = key2.encrypt(data, "base64");
                    const messageData1 = new Message({
                        sender: req.body.username,
                        receiver: req.body.receiver,
                        message: mdata
                    });
                    await messageData1.save()
                    .then(async(res)=>{
                        const messageID1 = String(res._id);
                        await User.updateOne({username: req.body.receiver}, 
                        {
                            $push: {  messages: messageID1  }
                        })
                    });   

                });
            });
            const messageData = new Message({
                sender: req.body.username,
                receiver: req.body.receiver,
                message: req.body.message
            });
            await messageData.save()
            .then(async(res)=>{
                const messageID2 = String(res._id);
                await User.updateOne({username: req.body.username}, 
                {
                    $push: {  messages: messageID2  }
                })
            });   
            res.status(200);
            res.send('OK');
        } catch (err) {
            console.log(err)
            res.status(500);
            res.send('Error');
        } 
    }
});

router.post('/messages', async(req, res)=>{
    const data = [];
    try{
        await User.find({username: req.body.username}).then(async(res)=>{
            const messages = res[0].messages;
            for(var i=0; i<messages.length; i++){
                await Message.findById(messages[i]).then((resp)=>{
                    console.log(resp)
                    data.push(resp);
                });
            }
        });
        res.status(200);
        res.send(data);
    } catch(err) {
        console.log(err)
        res.status(500);
        res.send('Error');
    }
})


module.exports = router;