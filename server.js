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

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});