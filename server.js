const express = require("express");
const app = express();

app.use(express.static('public'))

app.use(express.json());

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.get('/', (req, res) => {
  res.render(__dirname + '/views/index.html');
});

// ----- Mappa: elaborazione lato server -----
app.get('/map', (req, res) => {
  res.render(__dirname + '/views/map.html');
});

app.get('/rawdata', (req, res) => {
  console.log("Richiesta dei dati puri.");
  res.type("text/csv").sendFile(__dirname + "/views/data.csv");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});