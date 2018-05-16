// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');
moment().format();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// global variables
let result = {"unix": null, "utc" : "Invalid Date"}
let date;

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// routing for general request, triggers new Date()
app.get("/api/timestamp/", (req, res) => {
  date   = new Date()
  result = {"unix": date.getTime(), "utc": date.toUTCString()}
  res.json(result)
})

// routing for regular requests
app.get("/api/timestamp/:value", (req, res) => {
  
  // get request value
  let value = req.params.value
  
  // check if value is in YYYY-MM-DD format
  moment(value).isValid() ? date = moment(value) : date = moment.unix((parseInt(value)))
  
  result = {'unix': date.unix('x')*1000, 'utc': date.format('LLLL')} // *1000 is needed to have milliseconds
  res.json(result)
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});