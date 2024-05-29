import express from "express";
import handlebars from "express-handlebars"
import path from 'path';
import { fileURLToPath } from 'url'
import http from 'http'
import { Server } from "socket.io";
import { ChatServices } from "./dao/db/services/chatServices.js";
import db from "./dao/db/db.js"
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./dao/db/config/passport.js";
import routerIndex from "./routes/index.routes.js";
import config from "./config/config.js";
import cookieParser from "cookie-parser";
import { logger } from "./config/logger.js";
import swaggerRoutes from "./routes/swagger.routes.js";

const PORT = config.port;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(app)

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + "/public"))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongoUrl
    }),
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true
}))

initializePassport();

app.use(passport.initialize());
app.use(passport.session());

app.use(swaggerRoutes)
app.use(routerIndex)

export const io = new Server(server)
io.on('connection', async (socket) => {

    const chatServices = new ChatServices()
    const chatList = await chatServices.showMessages()

    socket.emit('chatLoad', chatList)

    socket.on('new-message', async (data) => {
        try {

            const msgs = await chatServices.addMessage(data)
            await chat.create(data)
            const chat = await chatServices.showMessages()
            socket.emit('mensajes', chat)
        } catch (err) {
            logger.error(`${err} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        }
    })
})


server.listen(PORT, () => {
    logger.info(`Server run on port ${PORT} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    db.connect();
})