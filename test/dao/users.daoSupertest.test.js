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

describe('Testing Users Dao', () => {


    it('El dao debe enviar un array con todos los usuarios', async () => {

        const result = await requester.get('/user/allUsers')

        console.log(result.body);

        expect(result.status).to.equal(200);

        expect(result.body).to.be.an('array');

    });

    it('El dao debe enviar un objeto con el usuario solicitado', async () => {

        const user = {
            email: 'user5@correo'
        }

        const result = await requester.get('/user/manage/searchByEmail').send(user)

        console.log(result.body);

        expect(result.status).to.equal(200);

        expect(result.body).to.be.an('object');

    });


    it('El dao debe cambiar el rol de usuario a premium y viceversa', async () => {

        const userMock = {
            email: 'prueba10@correo'
        }

        const before = await requester.get('/user/manage/searchByEmail').send(userMock)
        const result = await requester.post('/user/premium/66728a94e7c5fcdb4fb1d9ad')
        const after = await requester.get('/user/manage/searchByEmail').send(userMock)
        console.log(`Rol de usuario paso de ${before.body.role} a ${after.body.role}`)

        expect(before).to.be.not.equal(after)

        expect(result.status).to.equal(200);

    });

});


