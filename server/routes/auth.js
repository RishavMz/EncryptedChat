const express = require('express');
const router = express.Router();
const rsa = require('node-rsa');
const { conn } = require('../database/connection');

const key = [];

router.post('/register', async(req, res) => {
    if(req.body.username==null && req.body.firstname==null && req.body.lastname==null && req.body.password==null && req.body.email==null){
        res.status(400);
        res.send('Incomplete data');
    }
    const keys = new rsa();
    keys.generateKeyPair();
    const privatekey = keys.exportKey('private');
    const publickey = keys.exportKey('public');
    await conn.query(`INSERT INTO USERS (USERNAME, FIRSTNAME, LASTNAME, PASSWORD, EMAIL) VALUES(${conn.escape(req.body.username)},${conn.escape(req.body.firstname)},${conn.escape(req.body.lastname)},${conn.escape(req.body.password)},${conn.escape(req.body.email)})`, async(error, result)=>{
        if(error){
            throw error;
        } else {
            console.log(result);
            var userID=0;
            await conn.query(`SELECT ID FROM USERS WHERE USERNAME = ${conn.escape(req.body.username)}`, async(error, result)=>{
                if(error){
                    throw error;
                } else {
                    userID = result[0].ID;
                    await conn.query(`INSERT INTO  PUBLIC_KEYS(USER_ID, KEYDATA) VALUES(${conn.escape(userID)},${conn.escape(publickey)})`, async(error, result)=>{
                        if(error){
                            throw error;
                        } else {
                            console.log(result);
                        }
                    });
                    await conn.query(`INSERT INTO PRIVATE_KEYS (USER_ID, KEYDATA) VALUES(${conn.escape(userID)},${conn.escape(privatekey)})`, async(error, result)=>{
                        if(error){
                            throw error;
                        } else {
                            console.log(result);
                        }
                    });
                }
            });
        }
    });
    res.status(201);
    res.send("Success");
});

router.post('/login', async(req, res) => {
    if(req.body.username==null || req.body.password==null){
        req.status(400);
        res.send('Incomplete data');
    }
    await conn.query(`SELECT ID FROM USERS WHERE USERNAME=${conn.escape(req.body.username)} AND PASSWORD=${conn.escape(req.body.password)}`, async(error, result)=>{
        if(error){
            throw error;
        } else {
            console.log(result);
            if(result[0] && result[0].ID){
                const userID = result[0].ID;
                console.log(userID);
                await conn.query(`SELECT KEYDATA FROM PRIVATE_KEYS WHERE USER_ID =${conn.escape(userID)}`, async(error, result)=>{
                    if(error){
                        throw error;
                    } else {
                        res.status(200);
                        res.send(result[0].KEYDATA);   
                    }
                });
            } else 
            {
                res.status(403);
                res.send("Incorrect data")
            }
            
        }
    });
});

router.post('/logout', (req, res) => {
    res.status(200);
    res.send("No session Involved here, nothing to destroy");
});

module.exports = router;