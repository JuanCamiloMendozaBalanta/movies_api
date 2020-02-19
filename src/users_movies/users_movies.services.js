const UserMovies = require('./users_movies.model');

const findUserMovies = async () => {
  try {
    return await UserMovies.find();
  } catch (error) {
    return error;
  }
};

const findUserMoviesByMovie = async movie => {
  try {
    return await UserMovies.find({ movie });
  } catch (error) {
    return error;
  }
};

const findUserMoviesByMovieAndUser = async filter => {
  const { movie, user } = filter;
  try {
    return await UserMovies.findOne({ movie, user });
  } catch (error) {
    return error;
  }
};

const saveUserMovies = async info => {
  try {
    const newUserMovies = new UserMovies(info);
    return await newUserMovies.save();
  } catch (error) {
    return error;
  }
};

const editUserMovies = async (filter, info) => {
  const { movie, user } = filter;
  try {
    const response = await UserMovies.updateOne({ movie, user }, { $set: info });
    return response;
  } catch (error) {
    return error;
  }
};

module.exports = {
  findUserMovies,
  findUserMoviesByMovie,
  findUserMoviesByMovieAndUser,
  saveUserMovies,
  editUserMovies
};
