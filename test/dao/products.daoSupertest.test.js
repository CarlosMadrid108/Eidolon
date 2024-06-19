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

describe('Testing Products Dao', () => {

    it('El dao debe devolver un objeto que contiene un array con parte de la colección de productos y la info de la paginación', async () => {

        const result = await requester.get('/api/products/');

        console.log(result.body);

        expect(result.status).to.equal(200);

        expect(result.body).to.be.an('object');

        expect(result.body.payload).to.be.an('array');

    });

    it('El dao debe devolver un objeto que contiene la información del producto solicitado', async () => {

        const result = await requester.get('/api/products/65cb4329e61dce1957d61271');

        console.log(result.body);

        expect(result.status).to.equal(200);

        expect(result.body).to.be.an('object');

    });

    it("El api debe modificar un producto correctamente", async () => {
   
        const prodMock = {
            title: "premiumproduct50158d",
            description: "probando1sdsd",
            code: 1249,
            price: 500,
            status: true,
            stock: 22,
            category: "prueba2",
            thumbnail: []
        };

        const { statusCode } = await requester.put('/api/products/66722fb93c17c995d2572dff').send(prodMock)
        const prod = await requester.get('/api/products/66722fb93c17c995d2572dff');

        console.log(prodMock)
    
        expect(prodMock).is.eqls(
            {
                title: prod._body.title,
                description: prod._body.description,
                code: prod._body.code,
                price: prod._body.price,
                status: prod._body.status,
                stock: prod._body.stock,
                category: prod._body.category,
                thumbnail: prod._body.thumbnail
        }
        )
        expect(statusCode).is.eqls(201)
    })

});
