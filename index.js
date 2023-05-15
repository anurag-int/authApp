const express = require('express');
const app = express();
const dotenv = require('dotenv');

require('dotenv').config();
require('./config/db');

const PORT = process.env.PORT || 4000;


app.use(express.json());

const user = require('./routes/user');
app.use("/api/v1", user);


app.get('/', (req, res)=>{
    res.send(`Welcome to home Page`);
    console.log("Hello"); 
})

app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`);
})


