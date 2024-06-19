import { Router } from "express";
import { ProductContructors } from "../dao/factory.js";
import { handlePolicies } from "../dao/db/config/policies.js";
import errorHandler from "../dao/db/services/Errors/middlewares/index.js";

const routerProd = Router();
const productController = new ProductContructors

// routerProd.get('/',  productController.getProducts)
// routerProd.get('/:pid', handlePolicies(["user","admin","premium"]), productController.getProductById)
// routerProd.post('/', handlePolicies(["admin","premium"]), productController.addProduct)
// routerProd.put('/:pid', handlePolicies(["admin"]), productController.updateProduct)
// routerProd.delete('/:pid', handlePolicies(["admin","premium"]), productController.deleteProduct)
// routerProd.post('/mockingproducts', handlePolicies(["admin"]), productController.generateProducts)
// routerProd.post('/addFields', handlePolicies(["admin"]), productController.addFieldsToAll)
// routerProd.use(errorHandler)

routerProd.get('/',  productController.getProducts)
routerProd.get('/:pid',  productController.getProductById)
routerProd.post('/',  productController.addProduct)
routerProd.put('/:pid',  productController.updateProduct)
routerProd.delete('/:pid',  productController.deleteProduct)
routerProd.post('/mockingproducts',  productController.generateProducts)
routerProd.post('/addFields',  productController.addFieldsToAll)
routerProd.use(errorHandler)


export default routerProd