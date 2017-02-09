const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 4545;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

hbs.registerHelper('getcurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFileSync('server.log',log + '\n');
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/',(req, res) => {
  //res.send('<h1>Hello Nirav Patel!</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to My Website',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle : 'About Page',
    currentYear : new Date().getFullYear()
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage : 'It\'s a Bad Request. That we all know.'
  })
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
