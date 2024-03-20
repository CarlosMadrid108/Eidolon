import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    first_name: {
        type: String
    },

    last_name: {
        type: String
    },

    email: {
        type: String,
        unique: true
    },

    age: {
        type: Number
    },

    password: {
        type: String
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    },

    role: {
        type: String,
        default: 'user'
    },
},
{
    timestamps:true,
    strict:false
},
)

const users = mongoose.model('users', userSchema)

export default users