const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const userRout = require('./routes/userRouts');
const { nextTick } = require('process');

// localhost mongodb url, DBname: myproject
const connectionUrl = 'mongodb://127.0.0.1:27017/myproject';


const app = express()
const PORT = 5000;
app.set("view engine", "ejs");
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // pars application json


app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type, Authorization');
    
    next();
})
app.use(userRout);


mongoose.connect(connectionUrl).then(result=> {
    app.listen(PORT, ()=>{
        console.log("Server is started");
    })
}).catch(err=>{
    console.log(err);
}); 
 