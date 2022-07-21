const express = require('express');

const app = express();
const port = 3000;
const path = require('path');

//Import routes
var routes = require('./routes')

app.use('/', routes)

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

//Static middleware
app.use(express.public('public'))

// 404 error handler
app.use((req, res, next) => {
  err = new Error('Page not found');
  err.status = 404;
  err.message = `${err.status}`;
  next(err);
});

//Global error handler
app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
  }
  if (err.status === 404) {
    res.status = 404;
    res.render('error', { err });
  } else {
    err.message = err.message || `${err.status}`;
    err.status = (err.status || 500);
    res.render('error', { err });
  }
});

app.listen(port, function(){
  console.log(`${port}`)
});