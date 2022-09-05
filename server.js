const { json } = require("express");
const express = require("express");
const data = require("fs");
const app = express();

const dataReader = data.readFileSync(__dirname + '/public/data.json');

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

app.get('/success', (req, res) => {
  res.render(__dirname + '/views/success.html');
});

app.get('/error', (req, res) => {
  res.render(__dirname + '/views/error.html');
});

app.get('/rawdata', (req, res) => {
  console.log("Richiesta dei dati puri.");
  const parser = JSON.parse(dataReader);
  res.send(parser);
});

app.get('/insert', (req, res) => {
  res.render(__dirname + '/views/insert.html');
});

app.post('/insertion', (req, res) => {
  const parser = JSON.parse(dataReader);
  let check = false;
  
  if(req.body != undefined) {
    let position = [ req.body.clatitudine, req.body.clongitudine ]

    //controllo che non venga inserita un veicolo già registrato
    for (let i = 0; i < parser.length; i++) {
      if(position[0] == parser[i].clatitudine && position[1] == parser[i].clongitudine){
       check = true;
      }
    }

    if(check) {
      console.log(1);
      res.status(400).send('Errore');
    } else {
      //push() ritorna la nuova lunghezza del vett quindi lo assegno all'id
      parser.push(req.body);
      
      //aggiorno il file
      data.writeFileSync("public/data.json", JSON.stringify(parser));
  
      //risposta del server
      res.status(200).send(req.body);
    }
  } else {
    res.status(400).send('Errore');
  }
  
});

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});