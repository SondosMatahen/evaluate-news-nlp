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
const axios =require('axios')
app.use((cors()));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'))

    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
    console.log('Example app listening on port 8082!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

let sentimentData={}
//Route server
app.post('/getapi', ToGetAPI)

const apiKey = process.env.API_KEY;
console.log(`Your API key is ${apiKey}`);

async function ToGetAPI (req, res) {
    console.log('req', req.body);
    const urltext = req.body.key;
    // const URL = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&of=json&txt=${urltext}&model=general&lang=en`;
    const URL = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${urltext}&model=general&of=json&lang=en`;
   

    let result = await fetch(URL);
    // console.log('edata', result);

    // try {
        let apiResponse = await result.json();
        // console.log("apiResponse " , apiResponse);
        sentiment = {
            score_tag : apiResponse.score_tag,
            agreement : apiResponse.agreement,
            subjectivity : apiResponse.subjectivity,
            confidence : apiResponse.confidence,
            irony : apiResponse.irony
        }
    console.log('sentiment', sentiment);
        res.send(sentiment);;
    // } catch (e) {
    //     console.log('error equal to', e);
    // }
}


