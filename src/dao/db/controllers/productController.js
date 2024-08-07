import { ProductServices } from "../services/productServices.js";
import products from "../models/product.model.js";

const productServices = new ProductServices

export default class MongoProductController {
    constructor() { }

    async getProducts(req, res, next) {
        let { limit } = req.query
        let { category } = req.query
        let { page } = req.query
        let { sort } = req.query

        const prods = await productServices.paginateProducts(limit, category, page, sort)


        if (prods) {
            if (!req.session.user) {
                res.status(200).send(prods)
                return
            }

            let cart = req.session.user.cart
            res.status(200).send({ cart, ...prods })
        } else {
            res.status(500).send("Error inesperado en el server, no se puede manejar el proceso.")
        }

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

        if (req.session.user) {

            if (req.session.user.role === "premium") {
                const prod = await productServices.createProduct({ ...req.body, owner: req.session.user.email })

                if (!prod) {
                    res.status(400).send("El producto ya existe / falta uno o más campos")
                    return
                }

                res.status(201).send("Producto creado")
            } else {
                const prod = await productServices.createProduct({ ...req.body, owner: "admin" })

                if (!prod) {
                    res.status(400).send("El producto ya existe / falta uno o más campos")
                    return
                }

                res.status(201).send("Producto creado")
            }

        } else {

            const prod = await productServices.createProduct({ ...req.body, owner: "admin" })

            if (!prod) {
                res.status(400).send("El producto ya existe / falta uno o más campos")
                return
            }

            res.status(201).send("Producto creado")

        }

    }

    async updateProduct(req, res, next) {
        const { pid } = req.params
        const conf = await productServices.updateOneProduct(pid, req.body)
        if (conf) {
            res.status(201).send("Producto actualizado")
        } else {
            res.status(400).send("No se encuentra el producto / falta uno o más campos")
        }
    }

    async deleteProduct(req, res, next) {
        const { pid } = req.params
        const prod = await products.findById(pid)

        if (prod) {

            if (req.session.user) {
                if (req.session.user.role === "premium") {

                    if (req.session.user.email != prod.owner) {
                        res.status(404).send("No puedes eliminar un producto que no está en tu lista")
                        return
                    }
                    await productServices.deleteOneProduct(pid)
                    res.status(200).send("Producto eliminado")
                    return

                }

                await productServices.deleteOneProduct(pid)
                res.status(200).send("Producto eliminado")
                return


            } else {
                await productServices.deleteOneProduct(pid)
                res.status(200).send("Producto eliminado")
            }


        } else {
            res.status(404).send("No se encuentra el producto")
        }

    }

    async generateProducts(req, res, next) {
        const conf = await productServices.generateRandomProducts()
        if (conf) {
            res.status(201).send("Productos creados")
        } else {
            res.status(500).send("Error inesperado en el servidor")
        }
    }

    async addFieldsToAll(req, res, next) {
        const field = req.body

        const update = await productServices.addFieldsToAllProducts(field)

        if (update) {
            res.status(201).send("Productos actualizados")
        } else {
            res.status(500).send("Error inesperado en el servidor")
        }

    }
}