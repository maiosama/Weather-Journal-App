// const { response } = require("express");
// const { request } = require("https");
/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
//make a GET request to the weather page 
// the URL for the weather forcast
const appUrl = `https://api.openweathermap.org/data/2.5/weather?`;
// the variable to get the tempreture in celsius degrees
var celsius = 'metric';
//genrated API for my credentials
const apiKey ='b632c6d5cb35dfd906b20befaa28216f';

//add event listener for the entered zip code for the required city
document.getElementById('generate').addEventListener('click', getForcast);

// the function to be added to the event listener for the city
function getForcast(){
    // add the user entry in the Feeling text area to a vrailable
    let feelings = document.getElementById("feelings").value;
    // the variable for the zip code
    var zipCode = document.getElementById("zip").value;
    getEntry(zipCode,apiKey,celsius)
    .then(function (newData){
        // add project data to the POST request
       postEntry('/add', {date: newDate, temprature: newData.main.temp , feelings})     
    }).then(function(newEntry){
        updateUI();
    })
}

//GET URL data
async function getEntry(zipCode,apiKey,celsius) {
    const res = await fetch (`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`);
    console.log(res)
    try{
        const newData = await res.json();
        console.log(newData)
        return newData
    }catch(error){
        console.log("error", error);
        //apporopriately handle the error
    }
}

//POST data
async function postEntry  (url = '', data= {}){
    const request = await fetch(url, {
        method: 'POST',
        headers:{
            'content-type' : 'application/json'
        },
        body: JSON.stringify(data)
    });
try{
    const newEntry = await request.json();
    return newEntry;
} catch(error){
    console.log("Error", error)
};
};

//update UI with the new data
async function updateUI (){
    const request = await fetch('/all')
    try{
        const allData = await request.json()
        console.log(allData)
        document.getElementById("date").innerHTML = allData.date;
        document.getElementById("temp").innerHTML= allData.temprature;
        document.getElementById("content").innerHTML= allData.content;
    }catch(error){
        console.log("error", error);
        //apporopriately handle the error
    }
};
