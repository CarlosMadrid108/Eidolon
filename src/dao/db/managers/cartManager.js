
import carts from '../models/cart.model.js'
import products from '../models/product.model.js'
import { io } from '../../../index.js'

export class CartManager {

    async getProducts(cid) {

        try {
            const prod = await carts.findById(cid).populate('products.product')
            io.emit('carrito', prod.products)

            return prod.products

        } catch (err) {
            console.log(err)
            return false
        }
    }

    async addCart() {
        await carts.create({ products: [] })
    }

    async addProduct(pid, cid) {

        const myCart = await carts.findById(cid)
        const prod = await products.findById(pid)

        if (!myCart) {
            return false
        }

        const exists = await carts.findOne({
            _id: myCart._id,
            "products.product": prod._id,
        });

        if (!exists) {
            myCart.products.push({ product: prod._id, quantity: 1 })
            await carts.updateOne({ _id: cid }, myCart)

            return true
        } else {
            await carts.updateOne({
                _id: myCart._id,
                "products.product": prod._id
            }, {
                $inc: {
                    "products.$.quantity": 1
                }
            }
            )
            return true
        }
    }

    async deleteProduct(cid, pid){
        const myCart = await carts.findById(cid)
        const prod = await products.findById(pid)

        if (!myCart || !prod){
            return false
        }
        
        await carts.deleteOne({
            _id: myCart._id,
            "products.product": prod._id,
        })

        await carts.findByIdAndUpdate(myCart._id,{
            $pull: {
                products: {_id: prod._id}
            }
        }, {new: true});

        return true
    }
}