import mongoose from "mongoose";


const db = {
    connect: ()=>{
        return mongoose.connect("mongodb+srv://cmadrid1985:BKK36LGrIKqQ9fgy@eidolon.wvfjtau.mongodb.net/ecommerce")
        .then(()=>{
            console.log("Base de datos conectada")
        }).catch((err)=>{
            console.log(err)
        })
    }
}

export default db