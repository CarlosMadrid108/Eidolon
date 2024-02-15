import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true,
    },
})

const chat = mongoose.model('messages', ChatSchema)

export default chat