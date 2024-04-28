import { Router } from "express";
import { ProductContructors } from "../dao/factory.js";
import { PoliciesContructor } from "../dao/factory.js";

const policies = new PoliciesContructor

const routerProd = Router();
const productController = new ProductContructors

routerProd.get('/', policies.handlePolicies(["USER","ADMIN"]), productController.getProducts)
routerProd.get('/:pid', policies.handlePolicies(["USER","ADMIN"]), productController.getProductById)
routerProd.post('/', policies.handlePolicies(["ADMIN"]), productController.addProduct)
routerProd.put('/:pid', policies.handlePolicies(["ADMIN"]), productController.updateProduct)
routerProd.delete('/:pid', policies.handlePolicies(["ADMIN"]), productController.deleteProduct)

export default routerProd