import express from "express";
import handlebars from "express-handlebars"
import path from 'path';
import { fileURLToPath } from 'url'
import http from 'http'
import { Server } from "socket.io";
import { ChatManager } from "./dao/db/managers/chatManager.js";
import { ProductManager } from "./dao/db/managers/productManager.js";
import db from "./dao/db/db.js"
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./dao/db/passport/passport.js"; 

import routerProd from "./routes/products.routes.js"
import routerCart from "./routes/carts.routes.js"
import viewsRouter from "./routes/views.routes.js"
import routerSessions from "./routes/sessions.routes.js";

const PORT = 8080;
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
        mongoUrl: 'mongodb+srv://cmadrid1985:BKK36LGrIKqQ9fgy@eidolon.wvfjtau.mongodb.net/ecommerce'
    }),
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}))

initializePassport();

app.use(passport.initialize());
app.use(passport.session());
app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)
app.use('/views', viewsRouter)
app.use('/api/sessions', routerSessions)

export const io = new Server(server)
io.on('connection', async (socket) => {

    const chatManager = new ChatManager()
    const productManager = new ProductManager()

    const chatList = await chatManager.showMessages()
    const prods = await productManager.getProducts()

    socket.emit('chatLoad', chatList)

    socket.on('new-message', async (data) => {
        try {
            const msgs = await chatManager.addMessage(data)
            const chat = await chatManager.showMessages()
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