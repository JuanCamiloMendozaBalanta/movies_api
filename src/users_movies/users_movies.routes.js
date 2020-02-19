const express = require('express');
const app = express();
const { removeEmptyOrNull } = require('../utils/gadgets');
const {
  createUserMovie,
  getUserMovie,
  getUserMoviesByMovie,
  getUserMoviesByMovieAndUser,
  updateUserMovie
} = require('./users_movies.controller');

app.get('/movies', async (req, res) => {
  let { movie, user } = req.query;
  const objectFormart = removeEmptyOrNull({ movie, user });
  movie = objectFormart.movie;
  user = objectFormart.user;
  let data = [];
  if (movie && user) {
    const re = await getUserMoviesByMovieAndUser({ movie, user });
    if (re !== null) {
      data.push(re);
    }
  } else if (movie && !user) {
    data = await getUserMoviesByMovie(movie);
  } else {
    data = await getUserMovie();
  }
  data = data ? data : [];
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(500).json(data);
  }
});

app.post('/movies', async (req, res) => {
  const data = await createUserMovie(req.body);
  if (data && data.id) {
    res.status(200).json(data);
  } else {
    res.status(500).json(data);
  }
});

app.put('/movies/:movie/:user', async (req, res) => {
  const { movie, user } = req.params;
  const data = await updateUserMovie({ movie, user }, req.body);
  if (data && data.id) {
    res.status(200).json(data);
  } else {
    res.status(500).json(data);
  }
});

module.exports = app;
