import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: {
        type: Array,
        require: true,
        id: {
            type: String,
            require: true,
            trim: true
        },
        quantity: {
            type: Number,
            require: true,
            trim: true
        }
    }

})

const carts = mongoose.model('carts', cartsSchema)

export default carts