import { Router } from "express";
import { CartManager } from "../models/cartManager.js";

const cartManager = new CartManager('./data/productos.json', './data/carrito.json')

const routerCart = Router();

routerCart.get('/:cid', async (req, res) => {
    const { cid } = req.params
    const prod = await cartManager.getProducts(cid)

    if (prod) {
        res.status(200).send(prod)
    } else {
        res.status(404).send("No se encuentra el carrito")
    }
})

routerCart.post('/', async (req, res) => {
    const newCart = await cartManager.addCart()
    res.status(201).send("Carrito agregado")

})

routerCart.post('/:cid/product/:pid', async (req, res) => {
    const { cid } = req.params
    const { pid } = req.params

    const prod = await cartManager.addProduct(pid, cid)

    if (prod) {
        res.status(200).send("Producto agregado")
    } else {
        res.status(404).send("No se encuentra el producto o el carrito")
    }

})

export default routerCart