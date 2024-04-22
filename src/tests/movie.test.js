require('../models');

const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');

const URL_BASE = '/api/v1/movies'

const movie = {
    name:"Terminator",
    image:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Terminator_%28franchise_logo%29.svg/420px-Terminator_%28franchise_logo%29.svg.png",
    synopsis:"En ella Schwarzenegger interpreta al Terminator, un ciborg asesino enviado a través del tiempo desde el año 2029 a 1984 para asesinar a Sarah Connor",
    releaseYear:"1984"
};

let movieId

test("POST -> URL_BASE should return statusCode 201, and res.body.name === movie.name", async () => {
    const res = await request(app)
        .post(URL_BASE)
        .send(movie)

        movieId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});

test("GET ALL-> URL_BASE should return statusCode 200, and res.body.length === 1", async () => {
    const res = await request(app)
        .get(URL_BASE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});

test("GET ONE -> URL_BASE/:id should return statusCode 200, and  res.body.name === movie.name", async () => {
    const res = await request(app)
        .get(`${URL_BASE}/${movieId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});

test("PUT -> URL_BASE/:id should return statusCode 200, and res.body.name === bodyUpdate.name", async () => {
    const bodyUpdate = {
        name:"Comedia"
    }
    const res = await request(app)
        .put(`${URL_BASE}/${movieId}`)
        .send(bodyUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(bodyUpdate.name)
});

test("POST -> URL_BASE/:id/actors, should return statusCode 200 and res.body.length === 1", async () => {

    const actor = {
        firstName: "Willard",
        lastName: "Smith",
        nationality: "American",
        image: "https://es.web.img2.acsta.net/c_162_216/pictures/17/02/08/16/50/452749.jpg",
        birthday: "1968-09-25"
    }

    const createActor = await Actor.create(actor)

    const res = await request(app)
        .post(`${URL_BASE}/${movieId}/actors`)
        .send([createActor.id])

        // console.log(res.body)
        // console.log(res.body[0].movieActors.movieId)
        // console.log(res.body[0].movieActors.actorId)


    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].movieActors.movieId).toBe(movieId)
    expect(res.body[0].movieActors.actorId).toBe(createActor.id)

    await createActor.destroy()
});

test("POST -> URL_BASE/:id/directors, should return statusCode 200 and res.body.length ===1", async () => {
    const director = {
        firstName: "Peter",
        lastName: "Jackson",
        nationality: "New Zealander",
        image: "render",
        birthday: "1961-10-31"
    }

    const createDirector = await Director.create(director)

    const res = await request(app)
        .post(`${URL_BASE}/${movieId}/directors`)
        .send([createDirector.id])

        // console.log(res.body)
        // console.log(res.body[0].movieDirectors.movieId)
        // console.log(res.body[0].movieDirectors.directorId)


    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].movieDirectors.movieId).toBe(movieId)
    expect(res.body[0].movieDirectors.directorId).toBe(createDirector.id)

    await createDirector.destroy()
});

test("POST -> URL_BASE/:id/genres, should return statusCode 200 and res.body.length === 1", async () => {
    const genre = {
        name: "Drama"
    }
    const createGenre = await Genre.create(genre)
    const res = await request(app)
        .post(`${URL_BASE}/${movieId}/genres`)
        .send([createGenre.id])

        // console.log(res.body)
        // console.log(res.body[0].movieGenres.movieId)
        // console.log(res.body[0].movieGenres.genreId)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].movieGenres.movieId).toBe(movieId)
    expect(res.body[0].movieGenres.genreId).toBe(createGenre.id)
    
    await createGenre.destroy()
});

test("DELETED -> URL_BASE/:id should return statusCode 204", async () => {
    const res = await request(app)
        .delete(`${URL_BASE}/${movieId}`)

    expect(res.statusCode).toBe(204)
});