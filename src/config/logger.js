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