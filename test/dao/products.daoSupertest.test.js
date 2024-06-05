import  chai  from "chai";
import supertest from "supertest";
import mongoose from "mongoose";

const expect = chai.expect
const requester = supertest('http://localhost:8080')

mongoose.connect(`mongodb+srv://cmadrid1985:BKK36LGrIKqQ9fgy@eidolon.wvfjtau.mongodb.net/eidolonTest`);

describe('Testing Products Dao', ()=>{

    it('El dao debe devolver un objeto que contiene un array con la colección de productos y la info de la paginación', async() => {

       const result = await requester.get('/api/products/')
       console.log(result)

    })
})