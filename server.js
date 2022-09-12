//Forms declaration
const express = require("express");
const Joi = require('joi');
const data = require("fs");
const app = express();

//Json file reading and parsing
const dataReader = data.readFileSync(__dirname + '/public/data.json');
const parser = JSON.parse(dataReader);

//Static file in public for css
app.use(express.static('public'));

//Json file broker
app.use(express.json());

//View engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

/* ------------------- ENDPOINT GET INDEX PAGE ------------------- */
// N° 1 - Empty endpoint for homepage.
app.get('/', (req, res) => {
  res.render(__dirname + '/views/index.html');
});

// N° 2 - Endpoint for the map page.
app.get('/map', (req, res) => {
  res.render(__dirname + '/views/map.html');
});

// N° 3 - Endpoint for the add-area page.
app.get('/insert', (req, res) => {
  res.render(__dirname + '/views/insert.html');
});

// N° 4 - Endpoint for the remove-area page.
app.get('/remove', (req, res) => {
  res.render(__dirname + '/views/remove.html');
});

// N° 5 - Endpoint for the search-area page.
app.get('/search', (req, res) => {
  res.render(__dirname + '/views/search.html');
});

// N° 6 - Endpoint for the modify-area page.
app.get('/modify', (req, res) => {
  res.render(__dirname + '/views/modify.html');
});


/* ---------------------- ENDPOINT GET --------------------- */
// N° 1 - Endpoint for the json-data.
app.get('/rawdata', (req, res) => {
  console.log("Richiesta dei dati puri, l'operazione potrebbe richiedere alcuni minuti...")
  res.send(parser);
});

// N° 2 - Endpoint for the success page.
app.get('/success', (req, res) => {
  res.render(__dirname + '/views/success.html');
});

// N° 3 - Endpoint for the error page.
app.get('/error', (req, res) => {
  res.render(__dirname + '/views/error.html');
});


/* ---------------------- UTILITY FUNCTION --------------------- */
//Function created for code's cleaning
function validateArea(area) {
  const schema = Joi.object({
    ccomune:                            Joi.string(),
    cprovincia:                         Joi.string(),
    cregione:                           Joi.string(),
    cnome:                              Joi.string(),
    canno_inserimento:                  Joi.number(),
    cdata_e_ora_inserimento:            Joi.string().allow(''),
    cidentificatore_in_openstreetmap:   Joi.string().allow(''),
    
    clatitudine: Joi.number()
                    .required(),
    clongitudine: Joi.number()
                     .required()
  });

  return schema.validate(area);
}


/* ---------------------- UTILITY ENDPOINT --------------------- */
// N° 1 - Endpoint for the POST insert operation.
app.post('/insertion', (req, res) => {
  const { error } = validateArea(req.body);

  // 400 Bad Request
  if(error) return res.sendStatus(400);

  //Adds the element in the parsed file.
  parser.push(req.body);
  //Updates the JSON file
  data.writeFileSync("public/data.json", JSON.stringify(parser));
  //200 Ok
  return res.sendStatus(200);
});

// N° 2 - Endpoint for the DELETE removing operation.
app.delete('/removing', (req, res) => {
  const area = parser.find(a => a.clongitudine === req.body.clongitudine &&
                                a.clatitudine === req.body.clatitudine);
  
  //404 Not found
  if(!area) return res.sendStatus(404);

  //Removes the element in the parsed file.
  parser.splice(parser.indexOf(area), 1);
  //Updates the JSON file
  data.writeFileSync("public/data.json", JSON.stringify(parser));
  //200 Ok
  return res.sendStatus(200);
});

// N° 3 - Endpoint for the GET research operation.
app.get('/research', (req, res) => {
  const area = parser.find(a => a.clongitudine === req.query.clongitudine &&
                                a.clatitudine === req.query.clatitudine);

  //404 Not found
  if(!area) return res.sendStatus(404);
  //200 Ok
  return res.status(200).send(parser[parser.indexOf(area)]);
});

// N° 4 - Endpoint for the PUT modification operation.
app.put('/modification', (req, res) => {
  const area = parser.find(a => a.clongitudine === req.body.clongitudine &&
                                a.clatitudine === req.body.clatitudine);

  //404 Not found
  if(!area) return res.sendStatus(404);

  const { error } = validateArea(req.body);
  //400 Bad Request if parameters aren't good
  if(error) return res.sendStatus(400);
  //400 Bad Request if the new name is equals than the old one
  if(parser[parser.indexOf(area)].cnome === req.body.cnome) return res.sendStatus(400);
    
  //Updates the old name with the new one in the parsed file
  parser[parser.indexOf(area)].cnome = req.body.cnome;
  //Updates the JSON file
  data.writeFileSync("public/data.json", JSON.stringify(parser));
  //200 Ok
  return res.sendStatus(200);
});

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});