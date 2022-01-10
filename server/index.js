require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authroute = require('./routes/auth');
const messageroute = require('./routes/message');
const mongoose = require('mongoose');

const app = new express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.log(error));

app.use('/auth', authroute);
app.use('/message', messageroute);

app.get('/', (req, res)=> {
    res.send('Got some request');
});

app.listen(process.env.PORT, ()=>{
    console.log("Server is up and running on port "+process.env.PORT);
})