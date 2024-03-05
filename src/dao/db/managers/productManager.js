import { io } from '../../../index.js'
import products from '../models/product.model.js'

export class ProductManager {

    async getProducts(limit, filter, pg, sort) {


        if (!pg) {
            pg = 1
        }
        if (!limit) {
            limit = 10
        }

        if (!sort && !filter) {
            const prods = await products.paginate({}, { limit: limit, page: pg })
            const list = {
                payload: prods.docs,
                totalPages: prods.totalPages,
                prevPage: prods.prevPage,
                nextPage: prods.nextPage,
                page: prods.page,
                hasPrevPage: prods.hasPrevPage,
                hasNextPage: prods.hasNextPage,
                prevLink: `http://localhost:8080/api/products/?limit=${limit}&page=${prods.prevPage}`,
                nextLink: `http://localhost:8080/api/products/?limit=${limit}&page=${prods.nextPage}`
            }
            io.emit('productos', list)
            return list
        }

        if (!sort && filter) {
            const prods = await products.paginate({ category: filter }, { limit: limit, page: pg })

            const list =  {
                payload: prods.docs,
                totalPages: prods.totalPages,
                prevPage: prods.prevPage,
                nextPage: prods.nextPage,
                page: prods.page,
                hasPrevPage: prods.hasPrevPage,
                hasNextPage: prods.hasNextPage,
                prevLink: `http://localhost:8080/api/products/?limit=${limit}&category=${filter}&page=${prods.prevPage}`,
                nextLink: `http://localhost:8080/api/products/?limit=${limit}&category=${filter}&page=${prods.nextPage}`
            }
            io.emit('productos', list)
            return list
        }
        if (sort && !filter) {
            const prods = await products.paginate({}, { limit: limit, page: pg, sort: { price: sort } })
            const list = {
                payload: prods.docs,
                totalPages: prods.totalPages,
                prevPage: prods.prevPage,
                nextPage: prods.nextPage,
                page: prods.page,
                hasPrevPage: prods.hasPrevPage,
                hasNextPage: prods.hasNextPage,
                prevLink: `http://localhost:8080/api/products/?limit=${limit}&page=${prods.prevPage}$sort=${sort}`,
                nextLink: `http://localhost:8080/api/products/?limit=${limit}&page=${prods.nextPage}$sort=${sort}`
            }
            io.emit('productos', list)
            return list
        }

        const prods = await products.paginate({ category: filter }, { limit: limit, page: pg, sort: { price: sort } })
        const list = {
            payload: prods.docs,
            totalPages: prods.totalPages,
            prevPage: prods.prevPage,
            nextPage: prods.nextPage,
            page: prods.page,
            hasPrevPage: prods.hasPrevPage,
            hasNextPage: prods.hasNextPage,
            prevLink: `http://localhost:8080/api/products/?limit=${limit}&page=${prods.prevPage}&category=${filter}$sort=${sort}`,
            nextLink: `http://localhost:8080/api/products/?limit=${limit}&page=${prods.nextPage}&category=${filter}$sort=${sort}`
        }
        io.emit('productos', list)
        return list
    }


    async getProductById(pid) {
        try {
            const prod = await products.findById(pid)
            return prod
        } catch (err) {
            console.log(err)
        }
    }

    async addProduct(prod) {
        try {
            await products.create(prod)
            const prods = await products.find()
            //emit
            io.emit('productos', prods)
            return true
        } catch (err) {
            return false
        }
    }

    async updateProduct(pid, producto) {
        try {
            await products.updateOne({ _id: pid }, producto)
            const prods = await products.find()
            //emit
            io.emit('productos', prods)
            return true
        } catch {
            return false
        }
    }

    async deleteProduct(pid) {
        try {
            await products.deleteOne({ _id: pid })
            const prods = await products.find()
            //emit
            io.emit('productos', prods)

            return true
        } catch {
            return false
        }
    }
}