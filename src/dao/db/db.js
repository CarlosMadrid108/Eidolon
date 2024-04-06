import mongoose from "mongoose";
import config from "./config/config.js";

const db = {
    connect: async () => {
        return mongoose.connect(config.mongoUrl)
            .then(() => {
                console.log("Base de datos conectada")
            }).catch((err) => {
                console.log(err)
            })
    }
}

export default db