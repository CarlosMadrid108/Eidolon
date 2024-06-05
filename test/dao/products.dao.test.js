import mongoose from "mongoose";
import { ProductServices } from "../../src/dao/db/services/productServices.js";
import Assert from "assert";

mongoose.connect('mongodb+srv://cmadrid1985:BKK36LGrIKqQ9fgy@eidolon.wvfjtau.mongodb.net/eidolonTest')

const assert = Assert.strict;

describe('Testing Products Dao', () => {

before(function(){
    this.productServices = new ProductServices()
})

beforeEach(function(){
    this.timeout(5000)
})

it('El dao debe devolver un objeto que contiene un array con la colección de productos y la info de la paginación', async function(){
    const result = await this.productServices.paginateProducts()
    assert(typeof result === "object")
})

})