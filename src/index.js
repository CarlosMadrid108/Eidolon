import express from "express";
import handlebars from "express-handlebars"
import path from 'path';
import { fileURLToPath } from 'url'
import http from 'http'
import { Server } from "socket.io";

import routerProd from "./routes/products.routes.js"
import routerCart from "./routes/carts.routes.js"
import viewsRouter from "./routes/views.routes.js"

const PORT = 8080;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(app)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)
app.use('/views', viewsRouter)

const io = new Server(server)
io.on('connection', (socket)=>{
    
})

server.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`)
})


