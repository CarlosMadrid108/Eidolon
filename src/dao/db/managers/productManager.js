import { io } from '../../../index.js'
import products from '../models/product.model.js'

export class ProductManager {

    async getProducts() {
            const prods = await products.find()
            return prods
    }

    async getProductById(pid) {
        try{
        const prod = await products.findById(pid)
        return prod
    }catch(err){
        console.log(err)
    }
    }

    async addProduct(prod) {
        try{
            await products.create(prod)
            const prods = await products.find()
            //emit
            io.emit('productos', prods)
            return true
        }catch(err){
            return false
        }
    }

    async updateProduct(pid, producto) {
        try{
            await products.updateOne({_id:pid}, producto)
            const prods = await products.find()
            //emit
            io.emit('productos', prods)
            return true
        }catch{
            return false
        }
    }

    async deleteProduct(pid) {
        try{
        await products.deleteOne({_id:pid})
        const prods = await products.find()
        //emit
        io.emit('productos', prods)

        return true
    }catch{
        return false
    }
    }
}