import { ProductServices } from "../services/productServices.js";
import CustomError from "../services/Errors/customErrors.js";
import { generateProductErrorInfoSP } from "../services/Errors/messages/productsErrorMessages.js";
import EErrors from "../services/Errors/errorsEnum.js";

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
        const { title, description, code, price, status, stock, category, thumbnail } = req.body

        if (!title || !description || !code || !price || !status || !stock || !category ){
            CustomError.createError({
                name: "Product creation Error",
                cause: generateProductErrorInfoSP({ title, description, code, price, status, stock, category }),
                message: "Error tratando de crear el producto",
                code: EErrors.INVALID_TYPES_ERROR
            })
        }
        // const conf = await productServices.createProduct(req.body)
        // if (conf) {
        //     res.status(201).send("Producto creado")
        // } else {
        //     res.status(400).send("El producto ya existe / falta uno o más campos")
        // }

            await productServices.createProduct(req.body)
        
            res.status(201).send("Producto creado")
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