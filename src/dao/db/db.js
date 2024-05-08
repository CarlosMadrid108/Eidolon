import mongoose from "mongoose";
import config from "../../config/config.js";
import { logger } from "../../config/logger.js";

const db = {
    connect: async () => {
        return mongoose.connect(config.mongoUrl)
            .then(() => {
                logger.info(`Base de datos conectada - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
            }).catch((err) => {
                logger.error(`${err} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
            })
    }
}

export default db