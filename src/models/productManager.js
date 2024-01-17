import { promises as fs } from 'fs'
import uuid4 from 'uuid4'

export class ProductManager {

    constructor(path) {
        this.path = path
    };

    async getProducts() {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        return prods;
    }

    async getProductById(pid) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const prod = prods.find(p => p.id === pid);
        return prod;
    }

    async addProduct(prod) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const exists = prods.find(p => p.code === prod.code);
        if (exists) {
            return false
        } else {
            if (!prod.title || !prod.description || !prod.code || !prod.price || !prod.status || !prod.stock || !prod.category ) {
                return false
            }
            prod.id = uuid4();
            prods.push(prod)
            await fs.writeFile(this.path, JSON.stringify(prods))
            return true
        }
    }

    async updateProduct(pid, producto) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prod = prods.find(p => p.id === pid);

        if (prod) {
            prod.title = producto.title
            prod.description = producto.description
            prod.code = producto.code
            prod.price = producto.price
            prod.status = producto.status
            prod.stock = producto.stock
            prod.category = producto.category
            prod.thumbnail = producto.thumbnail

            if (!prod.title || !prod.description || !prod.code || !prod.price || !prod.status || !prod.stock || !prod.category ) {
                return false
            }

            await fs.writeFile(this.path, JSON.stringify(prods))
            return true

        } else {
            return false
        }
    }

    async deleteProduct(pid) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const prod = prods.find(p => p.id === pid);

        if (prod) {
            
            await fs.writeFile(this.path, JSON.stringify(prods.filter(p => p.id !== pid)))
            return true
        } else {
            return false
        }
    }
} 