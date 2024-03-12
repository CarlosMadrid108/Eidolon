import { Router } from "express";
import { CartManager } from "../dao/db/managers/cartManager.js";

//IDs de carritos
//65cc0b29c5107242c849f70b
//65cc90030d43c6ca255667da
//65de190a08e5074ae91de2d6
//65de1959bf90cca4f2f98877


const cartManager = new CartManager()

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

routerCart.delete('/:cid/products/:pid', async (req, res) => {
    const { cid } = req.params
    const { pid } = req.params

    const prod = await cartManager.deleteProduct(cid, pid)

    if (prod) {
        res.status(200).send("Producto Borrado")
    } else {
        res.status(404).send("No se encuentra el producto o el carrito")
    }

})

routerCart.delete('/:cid', async (req, res) => {
    const { cid } = req.params

    const prod = await cartManager.deleteProducts(cid)

    if (prod) {
        res.status(200).send("Producto Borrado")
    } else {
        res.status(404).send("No se encuentra el producto o el carrito")
    }

})

export default routerCart