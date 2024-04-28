
import carts from '../models/cart.model.js'
import products from '../models/product.model.js'
import tickets from '../models/ticket.model.js'
import users from '../models/user.model.js'
import transporter from '../../../config/nodemailer.js'
import { io } from '../../../index.js'
import uuid4 from 'uuid4'

export class CartServices {

    async findProduct(pid) {
        try {
            const prod = await products.findById(pid)
            return prod
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async findProducts(cid) {

        try {
            const prod = await carts.findById(cid).populate('products.product')
            io.emit('carrito', prod)

            return prod

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
            _id: cid,
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

    async purchaseProducts(cid) {
        try {
            const noStock = []
            let amount = 0
            const fechaHoraActual = new Date();
            const fechaActual = fechaHoraActual.toISOString().slice(0, 10);
            const horaActual = fechaHoraActual.toTimeString().slice(0, 8);
            const fechaHora = `${fechaActual} ${horaActual}`;

            const myCart = await carts.findById(cid)

            if(myCart.products[0]==undefined){
                
                return "No tienes productos en el carro"
            }

            for (const prod of myCart.products) {

                const product = await products.findById(prod.product._id)

                if (prod.quantity < product.stock) {
                    await products.findOneAndUpdate({_id : prod.product._id}, {$inc : {'stock' : -prod.quantity}})
                    await carts.findOneAndUpdate({ _id: cid }, { $pull: { products: { product: prod.product._id } } }, { new: true })
                    amount = amount + prod.quantity
                } else { 
                    noStock.push(prod._id.toString())
                }
            }

            const user = await users.findOne({ cart: cid })
            const code = uuid4()

            await tickets.create({
                code,
                purchase_datetime: fechaHora,
                amount,
                purchaser: user.email
            })

            let email = await transporter.sendMail({
                from: "Eidolon <cmadrid1985@gmail.com>",
                to: "cmadrid.108@hotmail.com",
                subject: "Compra efectuada",
                text: "Compra efectuada",
                html: `<div>
                            <h1>Compra Realizada</h1>
                                <ul>
                                    <li>Código: ${code}</li>
                                    <li>Fecha y Hora: ${fechaHora}</li>
                                </ul>
                        </div>`
            })
            if (!!email.messageId) {
                console.log('Mensaje Enviado', email.messageId)
            }

            return "Compra realizada con éxito, revise su correo"


        } catch (err) {
            console.log(err)
            return false
        }
    }
}