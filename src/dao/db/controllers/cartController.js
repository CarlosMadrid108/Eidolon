import products from "../models/product.model.js";
import { CartServices } from "../services/cartServices.js";

const cartServices = new CartServices

export default class MongoCartController {

    constructor(){}

   async getProducts (req, res, next) {
        const { cid } = req.params
        const prod = await cartServices.findProducts(cid)
    
        if (prod) {
            res.status(200).send(prod)
        } else {
            res.status(404).send("No se encuentra el carrito")
        }
    }

    async addCart (req, res, next) {
        const newCart = await cartServices.createCart()
        if (newCart){
            res.status(201).send("Se creo un nuevo carrito")
        } else {
            res.status(500).send("Error inesperado en el servidor")
        }
    } 

    async addProduct (req, res, next){
        const { cid } = req.params
        const { pid } = req.params
        
        const checkProd = await products.findById(pid)
        if(checkProd){
            if(checkProd.owner === req.session.user.email){
                console.log(checkProd.owner)
                console.log(req.session.user.email)

                res.status(400).send("No puedes agregar al carrito un producto que te pertenece")
                return
            }
        }

        const prod = await cartServices.pushProduct(pid, cid)
    
        if (prod) {
            res.status(201).send("Producto agregado")
        } else {
            res.status(404).send("No se encuentra el producto o el carrito")
        }
    }

    async deleteProduct (req, res, next) {
        const { cid } = req.params
        const { pid } = req.params
    
        const prod = await cartServices.deleteOneProduct(cid, pid)
    
        if (prod) {
            res.status(200).send("Producto Borrado")
        } else {
            res.status(404).send("No se encuentra el producto o el carrito")
        }
    }

    async deleteProducts (req, res, next) {
        const { cid } = req.params
    
        const prod = await cartServices.deleteAllProducts(cid)
    
        if (prod) {
            res.status(200).send("Productos Borrados")
        } else {
            res.status(404).send("No se encuentra el carrito")
        }
    }

    async purchaseProducts (req, res, next) {
        const { cid } = req.params

        const prods = await cartServices.purchaseProducts(cid)

        if (prods) {
            res.status(200).send(prods)
        } else {
            res.status(404).send("No se encuentra el producto o el carrito")
        }
    }
}