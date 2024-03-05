import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    first_name: {
        type: String
    },

    last_name: {
        type: String
    },

    email: {
        type: String
    },

    age: {
        type: Number
    },

    password: {
        type: String
    },

    role: {
        type: String
    }

})

const users = mongoose.model('users', userSchema)

export default users