require('../models')
const request = require('supertest')
const app = require('../app')

const URL_BASE = '/api/v1/directors'
const director = {
    firstName:"Steven",
    lastName:"Spielberg",
    nationality:"American",
    image:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/MKr25425_Steven_Spielberg_%28Berlinale_2023%29.jpg/405px-MKr25425_Steven_Spielberg_%28Berlinale_2023%29.jpg",
    birthday:"1946-12-18"
}

let directorId;

test("POST -> URL_BASE should return statusCode 201, and res.body.name = director.name", async () => {
    const res = await request(app)
        .post(URL_BASE)
        .send(director)

        directorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(director.name)
});

test("GET ALL -> URL_BASE should return statusCode 200, and res.body.length === 1", async () => {
    const res = await request(app)
        .get(URL_BASE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});

test("GET ONE -> URL_BASE/:id should return statusCode 200, and res.body.name === director.name", async () => {
    const res = await request(app)
        .get(`${URL_BASE}/${directorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(director.name)
});

test("PUT -> URL_BASE/:id should return statusCode 200, and res.body.name === director.name", async () => {
    const bodyUpdate = {
        firstName:"James",
    }
    const res = await request(app)
        .put(`${URL_BASE}/${directorId}`)
        .send(bodyUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(bodyUpdate.firstName)
});

test("DELETE -> URL_BASE/:id should return statusCode 204 " ,async () => {
    const res = await request(app)
        .delete(`${URL_BASE}/${directorId}`)

    expect(res.statusCode).toBe(204)
});