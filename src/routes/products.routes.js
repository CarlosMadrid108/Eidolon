import { Router } from "express";
import { ProductContructors } from "../dao/factory.js";
import { PoliciesContructor } from "../dao/factory.js";
import errorHandler from "../dao/db/services/Errors/middlewares/index.js";

const policies = new PoliciesContructor

const routerProd = Router();
const productController = new ProductContructors

routerProd.get('/', policies.handlePolicies(["USER","ADMIN"]), productController.getProducts)
routerProd.get('/:pid', policies.handlePolicies(["USER","ADMIN"]), productController.getProductById)
routerProd.post('/', productController.addProduct)
routerProd.put('/:pid', policies.handlePolicies(["ADMIN"]), productController.updateProduct)
routerProd.delete('/:pid', policies.handlePolicies(["ADMIN"]), productController.deleteProduct)
routerProd.post('/mockingproducts', policies.handlePolicies(["ADMIN"]), productController.generateProducts)
routerProd.use(errorHandler)


export default routerProd