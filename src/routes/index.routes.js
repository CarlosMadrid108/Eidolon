import routerProd from "./products.routes.js";
import routerCart from "./carts.routes.js"
import viewsRouter from "./views.routes.js"
import routerSessions from "./sessions.routes.js";


import { Router } from "express";

const routerIndex = Router();

routerIndex.use('/api/products', routerProd)
routerIndex.use('/api/carts', routerCart)
routerIndex.use('/views', viewsRouter)
routerIndex.use('/api/sessions', routerSessions)

export default routerIndex