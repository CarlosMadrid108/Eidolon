class ProductManager {
    constructor() {
        this.products = [];
        this.id = 0;
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Falta uno o más campos");
        } else {

            if (!this.products.some((p) => p.code === code)) {
                this.id++;
                let product = { title, description, price, thumbnail, code, stock };
                let id = { id: this.id, }
                let newProduct = { ...id, ...product }


                this.products.push(newProduct);
                console.log(`El producto ${title} ha sido agregado`);
            } else {
                console.log(`Ya existe un libro con este código`)
            }
        }
    }

    getProductById(id){
        let productFinder = this.products.find((e) => e.id === id);

        if  (productFinder) {
            return productFinder;
        } else {
            console.log("No existe ningun producto con este código")
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

console.log(products.getProducts());

console.log("-Búsqueda por Id-")

//Búsqueda por Id
console.log(products.getProductById(5));
