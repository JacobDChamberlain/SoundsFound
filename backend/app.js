const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');

const routes = require('./routes');
const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());



// Security Middleware:
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet - helps set a variety of headers to better secure this bad boy:
app.use(
  helmet.crossOriginResourcePolicy({
    police: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method:
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

// Router:
app.use(routes);

// -- Error Handlers --

// Catch unhandled requests and forward to error handler:
// (catches any requests that don't match any of the routes defined
//  & creates a server error with a status code of 404):
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err); // if err wasn't passed in, error handlers defined after this wouldn't be invoked. but they will be, bc next(err) instead of next()
});

// Process sequelize errors:
app.use((err, _req, _res, next) => {
  // check if the error is a Sequelize error:
  if (err instanceof ValidationError) {
    // if so, adds errors (array) key & title (string) key to error & passes to next error handler
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

// Error formatter:
// (formats all the errors before returning a JSON response)
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

module.exports = app;
