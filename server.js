const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
var port = 3000;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public')); //__dirname stores root

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to website'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Pagee'
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'bad bad bad. sad.'
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
