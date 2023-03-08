const express = require('express');
const bodyParser = require('body-parser');

require('dotenv/config');

// // Initialize DB:
// require('./initDB')();

const app = express();

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('public'));
// app.use(
//   session({
//     cookie: {maxAge: 3600000}, // Expire after 1 hours
//     store: new MemoryStore({
//       checkPeriod: 86400000 // prune expired entries every 24h
//     }),
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

const {
  addition,
  subtraction,
  multiplication,
  division,
} = require('./includes/math');

const {
  jello,
  cherryPopsicle,
  vanillaPudding,
  chocolateCake,
  iceCreamSundae,
} = require('./includes/level');

const randomize = require('./includes/random');

// //* Routes
// require('./routes')(app);

//* Root(/) GET route
app.get('/', (req, res, next) => {
  let num1 = randomize(jello);
  let num2 = randomize(jello);
  const add = addition(num1, num2);
  const subtract = subtraction(num1, num2);
  res.render('./home', {
    num1: num1,
    num2: num2,
    add: add,
    subtract: subtract,
    multiply: multiplication,
    divide: division,
  });
});

//******* ERROR HANDLERS *******//

//* 404 error handler
app.use((req, res, next) => {
  //Create a new the error class object
  const err = new Error();
  err.message = `It appears the page you requested doesn't exist.`;
  err.status = 404;

  // Log out the error code, and stack to the console, including message
  console.log('Error status code: ' + err.status);
  console.log(err.stack);

  // Render the page-not-found template
  res.status(404).render('./errors/page-not-found'); //display a generic 404 page without error stack
});

//* Global error handler
app.use((err, req, res, next) => {
  if (err) {
    if (err.status === 404) {
      res.status(404).render('./errors/page-not-found', { err }); //render the error status with the error
      console.log(err);
    } else {
      err.message = err.message; //|| "Oops, it looks like something went wrong on the server...";
      res.status(err.status || 500).render('./errors/error', { err }); //display the error status and render the error template w/ error message/object
      console.log('Error status code: ' + err.status);
      console.log(err.stack);
    }
  }
});

//* Server
app.listen(process.env.PORT || 5000, () => {
  console.log('Listening on port 5000...');
});
