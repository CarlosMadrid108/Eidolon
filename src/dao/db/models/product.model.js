import mongoose from "mongoose";
import  paginate  from 'mongoose-paginate-v2'

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
        type: Number,
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
    owner: {
        type: String,
        default: "admin",
    },
    thumbnail: {
        type: Array,
    }
})

ProductSchema.plugin(paginate)

const products = mongoose.model('products', ProductSchema )

export default products