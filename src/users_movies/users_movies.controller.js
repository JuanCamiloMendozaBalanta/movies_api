const {
  findUserMovies,
  findUserMoviesByMovie,
  findUserMoviesByMovieAndUser,
  saveUserMovies,
  editUserMovies
} = require('./users_movies.services');
const { removeEmptyOrNull } = require('../utils/gadgets');

const createUserMovie = async info => {
  try {
    const cleanInfo = removeEmptyOrNull(info);
    return await saveUserMovies(cleanInfo);
  } catch (error) {
    return error;
  }
};

const getUserMovie = async () => {
  try {
    return await findUserMovies();
  } catch (error) {
    return error;
  }
};

const getUserMoviesByMovie = async movie => {
  try {
    return await findUserMoviesByMovie(movie);
  } catch (error) {
    return error;
  }
};

const getUserMoviesByMovieAndUser = async filter => {
  try {
    return await findUserMoviesByMovieAndUser(filter);
  } catch (error) {
    return error;
  }
};

const updateUserMovie = async (filter, info) => {
  let response = '';
  const { movie } = filter;
  try {
    const update = await editUserMovies(filter, info);
    if (update.ok) {
      return (response = await findUserMoviesByMovieAndUser(filter));
    } else {
      response = `Error try to update the movie with id: ${movie}, meaby the movie doesn't exist`;
    }
    return response;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createUserMovie,
  getUserMovie,
  getUserMoviesByMovie,
  getUserMoviesByMovieAndUser,
  updateUserMovie
};
