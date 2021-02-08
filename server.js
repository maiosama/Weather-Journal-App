// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
var app = express();

/* Middleware*/
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, ()=> {
    console.log("server is runing")
    console.log(`runing on localhost:${port}`);
});
//post route
const data=[];

app.post("/add", addTemp)

function addTemp(req, res){    
        projectData.date = req.body.date,
        projectData.temprature = req.body.temprature,
        projectData.content= req.body.feelings,
    res.send(projectData)
};

// GET request
app.get('/all', getData)
function getData(req, res){
    res.send(projectData)
}