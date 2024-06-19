import { expect } from "chai";

import supertest from "supertest";

import mongoose from "mongoose";

const requester = supertest('http://localhost:8080');
before(async () => {

    await mongoose.connect('mongodb+srv://cmadrid1985:BKK36LGrIKqQ9fgy@eidolon.wvfjtau.mongodb.net/ecommerce', {

        useNewUrlParser: true,

        useUnifiedTopology: true,

    });

});

after(async () => {

    await mongoose.connection.close();

});

describe('Testing Carts Dao', () => {


    it('El dao debe devolver un objeto que contiene la colección del productos del carro solicitado', async () => {

        const result = await requester.get('/api/carts/660caf086ade1f2e1e2c67dd');

        console.log(result.body.products);

        expect(result.status).to.equal(200);

        expect(result.body).to.be.an('object');

        expect(result.body.products).to.be.an('array');

    });

    it('El dao debe crear un nuevo carro, devolver un codigo de estado 201 y un objeto vacío', async () => {

        const result = await requester.post('/api/carts');

        console.log(result.body);

        expect(result.status).to.equal(201);

        expect(result.body).to.be.an('object');

    });


    it('El dao debe eliminar todos los productos del carro solicitado y devolver un objeto vacio', async () => {

        const result = await requester.delete('/api/carts/662de6b8faa0fdf664b784fd');

        expect(result.status).to.equal(200);

        expect(result.body).to.be.an('object');

        console.log(result.body);

        expect(result.body).is.eqls({});

    });
});
