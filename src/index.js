import express from "express";
import handlebars from "express-handlebars"
import path from 'path';
import { fileURLToPath } from 'url'
import http from 'http'
import { Server } from "socket.io";
import { ProductManager } from "./dao/db/managers/productManager.js";
import db from "./dao/db/db.js"

import routerProd from "./routes/products.routes.js"
import routerCart from "./routes/carts.routes.js"
import viewsRouter from "./routes/views.routes.js"

const PORT = 8080;
const app = express();

//No me dejó usar __dirname porque estoy usando modules.
//Buscando en google encontré esta solución. No sé si está haciendo su trabajo (supongo que si, ya que no se ha roto nada (?))
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



export const io = new Server(server)
io.on('connection',  async (socket)=>{
    const productManager = new ProductManager('./data/productos.json')
    const prods = await productManager.getProducts()
    socket.emit('list', prods)

    //Para poder renderizar los productos desde la carga de la página tuve que enviar la data desde el server. Por alguna razón no pude usar readFile
    //en el js de src/public/js porque me tira "Uncaught SyntaxError: import declarations may only appear at top level of a module"
    //cuando intento importar algo. ¿Hay alguna manera de hacer importaciones en ese archivo?
})



server.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`)
    db.connect();
})