const express = require('express');
const app = express();
const port = process.env.port || 8000;
const taskModel = require('../backend/models/taskModel');
require('dotenv').config();
const mongoose = require('mongoose')
const URI = process.env.MONGO_URI;
const taskRoute = require('./routes/apiTaskRoute');
const connectDB = require('./config/connectDB');
const cors = require('cors');
// Middleware
const logger = (req,res,next) =>{
    console.log('Middleware run');
    next();
}
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());
// ROutes
app.get('/',(req,res)=>{
    res.send('helloWorld');
});

// create a task
app.use('/create',taskRoute);
app.use('/api',taskRoute);



const startServer = async() =>{
    await connectDB();
    try {
        app.listen(port, ()=>{
            console.log(`example app listening to ${port}`)
        });                
    } catch (error) {
        console.log(error);
    }
}
startServer();

