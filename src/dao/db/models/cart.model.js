import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: {
        type: Array,
        require: true,
    }
})

const carts = mongoose.model('carts', cartsSchema )

export default carts