import { ProductServices } from "../services/productServices.js";

const productServices = new ProductServices

export const getProducts = async (req, res, next) => {
    let { limit } = req.query
    let { category } = req.query
    let { page } = req.query
    let { sort } = req.query

    const prods = await productServices.paginateProducts(limit, category, page, sort)

    res.status(200).send(prods)
}

export const getProductById = async (req, res, next) => {
    const { pid } = req.params
    const prod = await productServices.findByIdProducts(pid)

    if (prod) {
        res.status(200).send(prod)
    } else {
        res.status(404).send("No se encuentra el producto")
    }
}

export const addProduct = async (req, res, next) => {
    const conf = await productServices.createProduct(req.body)
    if (conf) {
        res.status(201).send("Producto creado")
    } else {
        res.status(400).send("El producto ya existe / falta uno o más campos")
    }
}

export const updateProduct = async (req, res, next) => {
    const { pid } = req.params
    const conf = await productServices.updateOneProduct(pid, req.body)
    if (conf) {
        res.status(201).send("Producto actualizado")
    } else {
        res.status(404).send("No se encuentra el producto / falta uno o más campos")
    }
}

export const deleteProduct = async (req, res, next) => {
    const { pid } = req.params
    const conf = await productServices.deleteOneProduct(pid)
    if (conf) {
        res.status(201).send("Producto eliminado")
    } else {
        res.status(404).send("No se encuentra el producto")
    }
}
