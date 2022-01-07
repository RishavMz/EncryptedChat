require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authroute = require('./routes/auth');
const messageroute = require('./routes/message');
const databaseGenerator = require('./database/create');

const app = new express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', authroute);
app.use('/message', messageroute);

app.get('/', (req, res)=> {
    res.send('Got some request');
});

app.listen(process.env.PORT, ()=>{
    console.log("Server is up and running on port "+process.env.PORT);
})