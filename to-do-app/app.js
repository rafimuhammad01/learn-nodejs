const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser  = require('body-parser');
const mongoose = require("mongoose");


const todoRoutes = require("./api/routes/todo");

mongoose.connect('mongodb+srv://rafi_muhammad01:' + process.env.MONGO_ATLAS_PW + '@cluster0.dumg5.mongodb.net/to-do-api?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
    next();
})


//Routes
app.use("/v1/to-do", todoRoutes );


app.use((req, res, next) => {
    const error = new Error("Page Not Found");
    error.status = 404;     
    next(error);
}) 

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message: error.message,
            status : error.status
        }
    })
    
}) 

module.exports = app;