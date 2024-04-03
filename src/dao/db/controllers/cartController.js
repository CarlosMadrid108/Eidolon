import { CartServices } from "../services/cartServices.js";

const cartServices = new CartServices

export const getProducts = async (req, res, next) => {
    const { cid } = req.params
    const prod = await cartServices.findProducts(cid)

    if (prod) {
        res.status(200).send(prod)
    } else {
        res.status(404).send("No se encuentra el carrito")
    }
}

export const addCart = async (req, res, next) => {
    const newCart = await cartServices.createCart()
    res.status(201).send("Carrito agregado")
}

export const addProduct = async (req, res, next) => {
    const { cid } = req.params
    const { pid } = req.params

    const prod = await cartServices.pushProduct(pid, cid)

    if (prod) {
        res.status(200).send("Producto agregado")
    } else {
        res.status(404).send("No se encuentra el producto o el carrito")
    }
}

export const deleteProduct = async (req, res, next) => {
    const { cid } = req.params
    const { pid } = req.params

    const prod = await cartServices.deleteOneProduct(cid, pid)

    if (prod) {
        res.status(200).send("Producto Borrado")
    } else {
        res.status(404).send("No se encuentra el producto o el carrito")
    }
}


export const deleteProducts = async (req, res, next) => {
    const { cid } = req.params

    const prod = await cartServices.deleteAllProducts(cid)

    if (prod) {
        res.status(200).send("Productos Borrados")
    } else {
        res.status(404).send("No se encuentra el producto o el carrito")
    }
}