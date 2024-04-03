
import carts from '../models/cart.model.js'
import products from '../models/product.model.js'
import { io } from '../../../index.js'

export class CartServices {

    async findProducts(cid) {

        try {
            const prod = await carts.findById(cid).populate('products.product')
            io.emit('carrito', prod.products)

            return prod.products

        } catch (err) {
            console.log(err)
            return false
        }
    }

    async createCart() {
       const newCart = await carts.create({ products: [] })
       return newCart
    }

    async pushProduct(pid, cid) {

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

    async deleteOneProduct(cid, pid) {
        try {
            await carts.findOneAndUpdate({ _id: cid }, { $pull: { products: { product: pid } } }, { new: true })
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async deleteAllProducts(cid) {
        try {
            await carts.updateOne({ _id: cid }, { $set: { products: [] } });
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }
}