const express = require('express');

const app = new express();
const PORT = 5000;

app.get('/', (req, res)=> {
    res.send('Got some request');
});

app.listen(PORT, ()=>{
    console.log("Server is up and running on port "+PORT);
})