import { Router } from "express";
import { ProductManager } from "../dao/db/managers/productManager.js";

const productManager = new ProductManager()

const routerProd = Router();

routerProd.get('/', async (req, res) => {
    let { limit } = req.query
    let { category } = req.query
    let { page } = req.query
    let { sort } = req.query

    const prods = await productManager.getProducts(limit, category, page, sort)

    res.status(200).send(prods)
})


routerProd.get('/:pid', async (req, res) => {
    const { pid } = req.params
    const prod = await productManager.getProductById(pid)

    if (prod) {
        res.status(200).send(prod)
    } else {
        res.status(404).send("No se encuentra el producto")
    }
})

routerProd.post('/', async (req, res) => {
    const conf = await productManager.addProduct(req.body)
    if (conf) {
        res.status(201).send("Producto creado")
    } else {
        res.status(400).send("El producto ya existe / falta uno o más campos")
    }
})

routerProd.put('/:pid', async (req, res) => {
    const { pid } = req.params
    const conf = await productManager.updateProduct(pid, req.body)
    if (conf) {
        res.status(201).send("Producto actualizado")
    } else {
        res.status(404).send("No se encuentra el producto / falta uno o más campos")
    }
})

routerProd.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    const conf = await productManager.deleteProduct(pid)
    if (conf) {
        res.status(201).send("Producto eliminado")
    } else {
        res.status(404).send("No se encuentra el producto")
    }
})

export default routerProd