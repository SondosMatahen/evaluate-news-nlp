const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

// Body paser middle wire
// cors for web communcation
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

// fetch is not defined in NodeJS; installed via npm 
const fetch = require('node-fetch');
const { response } = require('express');

app.use((cors()));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
    console.log('Example app listening on port 8082!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


//Route server
// app.post('/getapi', ToGetAPI)

// const Url = "https://api.meaningcloud.com/sentiment-2.1";
// const apiKey = "?key=" + process.env.API_KEY;
// const textHolder = "&lang=en&of=json&txt=" //"&lang=auto" + "&ilang=en" + "&txt=";
// let userInput = []

async function ToGetAPI(req, res) {
    console.log('reqqq', req);

    const apiKey = process.env.API_KEY;
    const urltext = req.body.formText;
    const URL = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&of=json&txt=${urltext}&model=general&lang=en`;
    const result = await fetch(URL);
    console.log('edata', result);

    try {
        const data = await result.json();
        res.send(data);
    } catch (e) {
        console.log('error equal to', e);
    }
}


