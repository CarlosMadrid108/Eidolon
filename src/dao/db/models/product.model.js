import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    code: {
        type: Number,
        unique: true,
        require: true,
    },
    price: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        require: true,
    },
    stock: {
        type: Number,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    thumbnail: {
        type: Array,
    }
})

const products = mongoose.model('products', ProductSchema )

export default products