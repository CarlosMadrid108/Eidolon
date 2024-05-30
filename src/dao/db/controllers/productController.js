import { ProductServices } from "../services/productServices.js";
import CustomError from "../services/Errors/customErrors.js";
import { generateProductErrorInfoSP } from "../services/Errors/messages/productsErrorMessages.js";
import EErrors from "../services/Errors/errorsEnum.js";
import products from "../models/product.model.js";

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

        if (prods){
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

        let { title, description, code, price, status, stock, category, thumbnail } = req.body

        if (!title || !description || !code || !price || !status || !stock || !category ){
            CustomError.createError({
                name: "Product creation Error",
                cause: generateProductErrorInfoSP({ title, description, code, price, status, stock, category}),
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

        if (req.session.user.role === "premium"){
           const prod = await productServices.createProduct({...req.body, owner: req.session.user.email})

            if (!prod){
                res.status(400).send("El producto ya existe / falta uno o más campos")
                return
            }

            res.status(201).send("Producto creado")
        } else {
            const prod = await productServices.createProduct({...req.body, owner: "admin"})

            if (!prod){
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

        if (prod){
            if(req.session.user.role==="premium") {
            
                if(req.session.user.email != prod.owner){
                    res.status(404).send("No puedes eliminar un producto que no está en tu lista")
                    return
                }

            }

            await productServices.deleteOneProduct(pid)
            res.status(204).send("Producto eliminado")

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