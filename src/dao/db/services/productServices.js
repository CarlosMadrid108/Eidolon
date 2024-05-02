import { io } from '../../../index.js'
import products from '../models/product.model.js'
import { faker } from "@faker-js/faker/locale/es"

export class ProductServices {

    async paginateProducts(limit, filter, pg, sort) {


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

            const list = {
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


    async findByIdProducts(pid) {
        try {
            const prod = await products.findById(pid)
            return prod
        } catch (err) {
            console.log(err)
        }
    }

    async createProduct(prod) {
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

    async updateOneProduct(pid, producto) {
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

    async deleteOneProduct(pid) {
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

    async generateRandomProducts() {
        try {

            for (let i = 0; i < 100; i++) {
                const prod = {
                    title: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    code: faker.number.int({ min: 0, max: 8000 }),
                    price: faker.commerce.price(),
                    status: true,
                    stock: faker.number.int({ min: 0, max: 20 }),
                    category: faker.commerce.productAdjective(),
                    thumbnail: [faker.image.urlPlaceholder()]
                }

            const title = await products.findOne({ title: prod.title })
            const code = await products.findOne({ code: prod.code})
       
                if (title || code){
                    console.log("Duplicate")
                } else {  await products.create(prod) }
    
            }

            return true

        } catch (err) {
            console.log(err)
            return false
        }
    }
}