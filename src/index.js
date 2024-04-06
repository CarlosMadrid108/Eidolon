import express from "express";
import handlebars from "express-handlebars"
import path from 'path';
import { fileURLToPath } from 'url'
import http from 'http'
import { Server } from "socket.io";
import { ChatServices } from "./dao/db/services/chatServices.js";
import { ProductServices } from "./dao/db/services/productServices.js";
import db from "./dao/db/db.js"
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./dao/db/config/passport.js"; 
import routerIndex from "./routes/index.routes.js";
import config from "./dao/db/config/config.js";

const PORT = config.port;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(app)

app.use(express.json())
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
app.use(routerIndex)

export const io = new Server(server)
io.on('connection', async (socket) => {

    const chatServices = new ChatServices()
    const productServices = new ProductServices()

    const chatList = await chatServices.showMessages()
    const prods = await productServices.paginateProducts()

    socket.emit('chatLoad', chatList)

    socket.on('new-message', async (data) => {
        try {
            const msgs = await chatServices.addMessage(data)
            const chat = await chatServices.showMessages()
            socket.emit('mensajes', chat)
        } catch (err) {
            console.log(err)
        }
    })
})

server.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`)
    db.connect();
})