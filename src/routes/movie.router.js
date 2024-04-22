const { getAll, create, getOne, remove, update, setGenresToMovie, setActorsToMovie, setDirectorsToMovie } = require('../controllers/movie.controllers');
const express = require('express');

const routerMovie = express.Router();

routerMovie.route('/')
    .get(getAll)
    .post(create);

routerMovie.route('/:id/genres')
    .post(setGenresToMovie)

routerMovie.route('/:id/actors')
    .post(setActorsToMovie)

routerMovie.route('/:id/directors')
    .post(setDirectorsToMovie)

routerMovie.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerMovie;