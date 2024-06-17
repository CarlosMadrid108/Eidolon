import routerProd from "./products.routes.js";
import routerCart from "./carts.routes.js"
import viewsRouter from "./views.routes.js"
import routerSessions from "./sessions.routes.js";
import TestController from "../dao/db/controllers/testController.js";
import routerUsers from "./user.routes.js";



import { Router } from "express";

const routerIndex = Router();
const testController = new TestController


routerIndex.use('/api/products', routerProd)
routerIndex.use('/api/carts', routerCart)
routerIndex.use('/views', viewsRouter)
routerIndex.use('/api/sessions', routerSessions)
routerIndex.use('/user', routerUsers)


routerIndex.get('/loggerTest', testController.loggerTest)
routerIndex.get("/", (req, res) => {
    res.redirect('/views/login')
});



export default routerIndex