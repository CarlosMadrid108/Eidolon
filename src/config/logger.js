import winston from 'winston'
import config from './config.js'

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: 'red',
        error: 'yellow',
        warning: 'magenta',
        info: 'cyan',
        http: 'blue',
        debug: 'grey',
    }
}

winston.addColors(customLevelsOptions.colors)

const devLogger = winston.createLogger({
    levels: customLevelsOptions.levels,

    transports: [
        new winston.transports.Console(
            {
                level: "debug",
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelsOptions.colors }),
                    winston.format.simple()
                )
            }
        ),
    ]
})

const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console(
            {
                level: "info",
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelsOptions.colors }),
                    winston.format.simple()
                )
            }
        ),
        new winston.transports.File(
            {
                filename: './erros.log',
                level: "error",
                format: winston.format.simple()
            }
        )
    ]
})

//Está función para los loggers es la que vimos en clase, la verdad nuncá entendí que proposito cumple
//ya que dispara todos sus logs cuando utilizo cualquiera de los endpoints
//al ser implementada de la forma que se vió en la clase
//Tampoco he sabido como aplicarla a los requerimientos de la entrega
//No comprendo como reemplazar los console.log de cualquier archivo al estar sujeto a la limitación del req.logger

export const addLogger = (req, res, next) => {


    if (config.environment === "production") {
        req.logger = prodLogger;

        req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        req.logger.warning(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        req.logger.debug(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)


    } else {
        req.logger = devLogger;

        req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        req.logger.warning(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        req.logger.debug(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    }
    next();
}

//Por ello he creado un logger diferente de la única forma que se me ocurrió (con un poco de ayuda) para poder usarla con libertad en el proyecto
//el cual varía sus opciones dependiendo del entorno y de acuerdo a los requerimientos de la entrega
//Este logger se está usando en los siguientes archivos del proyexcto:
//cartServices.js
//productServices.js
//testController.js
//db.js
//index.js
//Reemplazando los console.log que estaban antes
//Primero lo importo y luego lo llamo, por ejemplo, con un "logger.info("")"
//No se si está forma de implementarlo es correcta pero es lo único que se me ocurrió al no saber como usar el código que se vió en clase
//El endpoint para probarlo es /loggerTest
//Sus archivos están en index.routes.js y testController.js

let transportsOptions

if (config.environment === "production") {
    transportsOptions = [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'error',
            format: winston.format.simple()
        })
    ];
} else {
    transportsOptions = [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            )
        })
    ];
}

export const logger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: transportsOptions
});