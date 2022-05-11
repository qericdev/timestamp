// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();


app.get('/api', (req,res) => {
  const dateNow = Date.now();
  const timeNow = new Date();
  res.json({"unix":dateNow, "utc":timeNow.toUTCString()});
})

app.get('/api/:date',(req, res) => {
  const dateInserted = req.params.date;

  const parts = dateInserted.split("-");
  const dateFormated = new Date(parts[0],parts[1]-1,parts[2]);

  if(dateInserted === parts[0] && parseInt(dateInserted) > 0 && parseInt(dateInserted) <= 2147483647000) {
    const dateToUtc = new Date(parseInt(dateInserted));
    console.log(dateToUtc);
    res.json({"unix":dateInserted, "utc":dateToUtc.toUTCString()});
  }

  if(parseInt(parts[0]) >= 0 && (parseInt(parts[1])-1 >= 0 && parseInt(parts[1])-1 <= 12) && (parseInt(parts[2]) >= 0 && parseInt(parts[2])<=31)) {
    const dateToUtcString = dateFormated.toUTCString();
    const dateUnixTimeStamp = Math.floor(dateFormated.getTime());
    res.json({"unix":dateUnixTimeStamp, "utc":dateToUtcString});
  } else {
    res.json({"error":"Invalid Date"});
  }
  
});


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
