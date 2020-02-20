const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { environment, port, generateUrlDB } = require('./configuration/config');

const app = express();

// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  if (environment === 'DEV') {
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:3000`);
  } else {
    res.setHeader('Access-Control-Allow-Origin', `https://movies-web-site.herokuapp.com`);
  }

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./src/users_movies/users_movies.routes'));

const db = generateUrlDB();

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.listen(port, () => {
  console.log(`Movies listening on port ${port}`);
});

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});
