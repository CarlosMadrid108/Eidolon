const fs = require('fs')

fs.writeFileSync('./products.json', JSON.stringify([]), { encoding: 'utf-8' })

class ProductManager {
    constructor() {
        this.products = JSON.parse(fs.readFileSync('./products.json', { encoding: 'utf-8' }));
        this.id = 0;
    }

    getProducts() {
        this.products = JSON.parse(fs.readFileSync('./products.json', { encoding: 'utf-8' }));

        if (!this.products.find((e) => e.id)) {
            return "No hay productos agregados"
        }

        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        this.products = JSON.parse(fs.readFileSync('./products.json', { encoding: 'utf-8' }));

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Falta uno o más campos");
        } else {

            if (!this.products.some((p) => p.code === code)) {
                this.id++;
                let newProduct = { id: this.id, title, description, price, thumbnail, code, stock };

                this.products.push(newProduct);

                fs.writeFileSync('./products.json', JSON.stringify(this.products), { encoding: 'utf-8' })

                console.log(`El producto ${title} ha sido agregado`);
            } else {
                console.log(`Ya existe un libro con este código`)
            }
        }
    }

    updateProduct(id, title, description, price, thumbnail, code, stock) {

        this.products = JSON.parse(fs.readFileSync('./products.json', { encoding: 'utf-8' }));

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Falta uno o más campos");
        } else {

            let productsForUpdate = this.products.filter((e) => e.id !== id);
            let productForReplace = { id, title, description, price, thumbnail, code, stock };
            productsForUpdate.push(productForReplace);
            productsForUpdate.sort((a, b) => a.id - b.id);

            fs.writeFileSync('./products.json', JSON.stringify(productsForUpdate), { encoding: 'utf-8' })

            this.products = JSON.parse(fs.readFileSync('./products.json', { encoding: 'utf-8' }));
            console.log(this.products)

        }
    }

    deleteProduct(id) {

        if (!this.products.some((e) => e.id === id)) {
            return "No hay ningun producto con ese id"
        }

        let productsForDelete = this.products.filter((e) => e.id !== id);

        fs.writeFileSync('./products.json', JSON.stringify(productsForDelete), { encoding: 'utf-8' })

        this.products = JSON.parse(fs.readFileSync('./products.json', { encoding: 'utf-8' }));
        console.log(this.products)
    }

    getProductById(id) {

        this.products = JSON.parse(fs.readFileSync('./products.json', { encoding: 'utf-8' }));

        let productFinder = this.products.find((e) => e.id === id);

        if (productFinder) {
            return productFinder;
        } else {
            return "No existe ningun producto con este código"
        }

    }
}

const products = new ProductManager()

products.addProduct("Producto1", "Descripción1", 199, "https://enlace1.jpg", 1111, 2);
products.addProduct("Producto2", "Descripción2", 299, "https://enlace2.jpg", 2222, 2);
//Prueba de código repetido
products.addProduct("Producto3", "Descripción3", 399, "https://enlace2.jpg", 2222, 2);
//Prueba de propiedad faltante
products.addProduct("Descripción4", 499, "https://enlace4.jpg", 3333, 2);

console.log("---Lista con productos agregados---");
console.log(products.getProducts());

//Búsqueda por Id
console.log("---Búsqueda por Id---")
console.log(products.getProductById(1));

//Actualización de producto
//El primer parámetro debe ser el ID a buscar
//Luego se deben completar los otros 6 campos que corresponden a los datos a actualizar
console.log("---Actualización de Producto---")
console.log(products.updateProduct(1, "Producto99", "Descripción99", 999, "https://enlace99.jpg", 9999, 2))

//Borrado de producto
console.log("---Lista con producto borrado---")
console.log(products.deleteProduct(2))

