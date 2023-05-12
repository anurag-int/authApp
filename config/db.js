const mongoose = require('mongoose');

require('dotenv').config();


    const db = 'mongodb+srv://auth:authentication@cluster0.pqiobz0.mongodb.net/?retryWrites=true&w=majority';

    mongoose.connect(db)
    .then(()=>{
        console.log("Successfully Connected by Database");
    })
    .catch((e)=>{
        console.log("Connection Failed");
        console.log(e);
    })

