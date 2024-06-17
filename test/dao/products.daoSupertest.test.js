import { expect } from "chai";

import supertest from "supertest";

import mongoose from "mongoose";

const requester = supertest('http://localhost:8080');
before(async () => {

await mongoose.connect('mongodb+srv://cmadrid1985:BKK36LGrIKqQ9fgy@eidolon.wvfjtau.mongodb.net/eidolonTest', {

useNewUrlParser: true,

useUnifiedTopology: true,

});

});

after(async () => {

await mongoose.connection.close();

});

describe('Testing Products Dao', () => {

it('El dao debe devolver un objeto que contiene un array con parte de la colección de productos y la info de la paginación', async () => {

const result = await requester.get('/api/products/');

console.log(result.body);

expect(result.status).to.equal(200);

expect(result.body).to.be.an('object');

expect(result.body.payload).to.be.an('array');

});

});