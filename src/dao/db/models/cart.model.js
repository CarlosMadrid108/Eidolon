import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({

    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: {
                    type: Number,
                    require: true,
                    trim: true
                }
            }
        ]
    }

})

const carts = mongoose.model('carts', cartsSchema)

export default carts