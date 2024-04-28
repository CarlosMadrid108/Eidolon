import mongoose from "mongoose";

const ticketsSchema = new mongoose.Schema({

    code: {
        type: String,
        require: true
    },
    purchase_datetime: {
        type: String,
        require: true,
    },
    amount: {
        type: Number,
        require: true,
    },
    purchaser: {
        type: String,
        require: true,
    }

})

const tickets = mongoose.model('tickets', ticketsSchema)

export default tickets