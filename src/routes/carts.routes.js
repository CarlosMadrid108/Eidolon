import { Router } from "express";
import { CartConstructors } from "../dao/factory.js";
import { PoliciesContructor } from "../dao/factory.js";

const cartController = new CartConstructors;
const policies = new PoliciesContructor
const routerCart = Router();

routerCart.get('/:cid', policies.handlePolicies(["USER", "ADMIN"]), cartController.getProducts)
routerCart.post('/', cartController.addCart)
routerCart.post('/:cid/product/:pid', policies.handlePolicies(["USER", "ADMIN"]), cartController.addProduct)
routerCart.delete('/:cid/products/:pid', policies.handlePolicies(["USER", "ADMIN"]), cartController.deleteProduct)
routerCart.delete('/:cid', policies.handlePolicies(["USER", "ADMIN"]), cartController.deleteProducts)

export default routerCart