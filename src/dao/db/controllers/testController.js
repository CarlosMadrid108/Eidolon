import { logger } from "../../../config/logger.js";

export default class TestController {

    async loggerTest(req, res) {

    logger.fatal("Prueba de log level fatal --> en Endpoint")
    logger.error("Prueba de log level error --> en Endpoint")
    logger.warning("Prueba de log level warning --> en Endpoint")
    logger.info("Prueba de log level info--> en Endpoint")
    logger.http("Prueba de log level http --> en Endpoint")
    logger.debug("Prueba de log level debug --> en Endpoint")

     res.send("Prueba de loggers")   
    }
}