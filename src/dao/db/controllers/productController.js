import { ProductServices } from "../services/productServices.js";

const productServices = new ProductServices

export default class MongoProductController {
    constructor(){}

    async getProducts(req, res, next) {
        let { limit } = req.query
        let { category } = req.query
        let { page } = req.query
        let { sort } = req.query

        let cart = req.session.user.cart

        const prods = await productServices.paginateProducts(limit, category, page, sort)
        res.status(200).send({ cart, ...prods })
    }

    async getProductById(req, res, next) {
        const { pid } = req.params
        const prod = await productServices.findByIdProducts(pid)

        if (prod) {
            res.status(200).send(prod)
        } else {
            res.status(404).send("No se encuentra el producto")
        }
    }

    async addProduct(req, res, next) {
        const conf = await productServices.createProduct(req.body)
        if (conf) {
            res.status(201).send("Producto creado")
        } else {
            res.status(400).send("El producto ya existe / falta uno o más campos")
        }
    }

    async updateProduct(req, res, next) {
        const { pid } = req.params
        const conf = await productServices.updateOneProduct(pid, req.body)
        if (conf) {
            res.status(201).send("Producto actualizado")
        } else {
            res.status(404).send("No se encuentra el producto / falta uno o más campos")
        }
    }

    async deleteProduct(req, res, next) {
        const { pid } = req.params
        const conf = await productServices.deleteOneProduct(pid)
        if (conf) {
            res.status(201).send("Producto eliminado")
        } else {
            res.status(404).send("No se encuentra el producto")
        }
    }

    async generateProducts(req, res, next) {
        const conf = await productServices.generateRandomProducts()
        if (conf) {
            res.status(201).send("Productos creados")
        } else {
            res.status(404).send("No se encuentra el producto")
        }
    }

}