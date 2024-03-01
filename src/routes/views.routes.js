import { Router } from "express";
import { ProductManager } from "../dao/db/managers/productManager.js";
import { CartManager } from "../dao/db/managers/cartManager.js";

const productManager = new ProductManager()
const cartManager = new CartManager()

const routerViews = Router();

//http://localhost:8080/views/realTimeProducts/?page=1
routerViews.get('/realTimeProducts', async (req, res) => {
    let { limit } = req.query
    let { category } = req.query
    let { page } = req.query
    let { sort } = req.query
    const prods = await productManager.getProducts(limit, category, page, sort)
    .then(res.render('home', {}))
})

//http://localhost:8080/views/carts/65cc90030d43c6ca255667da
routerViews.get('/carts/:cid', async (req, res) => {
    const {cid} = req.params
    const prods = await cartManager.getProducts(cid)
    .then(res.render('cart', {}))
})

//http://localhost:8080/views/chat
routerViews.get('/chat', (req, res) => {
    res.render('chat', {})

})

export default routerViews