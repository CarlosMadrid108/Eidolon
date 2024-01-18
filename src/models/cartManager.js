import { promises as fs, readFileSync } from 'fs'
import uuid4 from 'uuid4'

export class CartManager {

    constructor(productPath, cartPath) {
        this.productPath = productPath
        this.cartPath = cartPath
    };

    async getProducts(cid) {
        const cart = JSON.parse(await fs.readFile(this.cartPath, 'utf-8'));
        const prods = cart.find(c => c.id === cid)
        if (!prods) {
            return false
        }
        return prods.products
    }

    async addCart() {
        const cart = JSON.parse(await fs.readFile(this.cartPath, 'utf-8'));
        cart.push({ id: uuid4(), products: [] })
        await fs.writeFile(this.cartPath, JSON.stringify(cart))
    }

    async addProduct(pid, cid) {
        const prods = JSON.parse(await fs.readFile(this.productPath, 'utf-8'));
        const cart = JSON.parse(await fs.readFile(this.cartPath, 'utf-8'));
        const prod = prods.find(p => p.id === pid)
        if (prod) {
            const myCart = cart.find(c => c.id === cid)
            if (!myCart) {
                return false
            } else {
                const exists = myCart.products.find(p => p.product === pid)
                if (exists) {
                    exists.quantity = exists.quantity + 1
                } else {
                    myCart.products.push({ product: prod.id, quantity: 1 })
                }
            }

            await fs.writeFile(this.cartPath, JSON.stringify(cart))
            return true

        } else {
            return false
        }
    }
}