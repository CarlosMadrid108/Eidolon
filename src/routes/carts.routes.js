import { Router } from "express";
import { CartConstructors } from "../dao/factory.js";
import { PoliciesContructor } from "../dao/factory.js";

const cartController = new CartConstructors;
const policies = new PoliciesContructor
const routerCart = Router();

routerCart.get('/:cid',  policies.handlePolicies(["USER"]), cartController.getProducts)
routerCart.post('/', policies.handlePolicies(["USER"]), cartController.addCart)
routerCart.post('/:cid/product/:pid', policies.handlePolicies(["USER"]), cartController.addProduct)
routerCart.delete('/:cid/products/:pid', policies.handlePolicies(["USER"]), cartController.deleteProduct)
routerCart.delete('/:cid', policies.handlePolicies(["USER"]), cartController.deleteProducts)
routerCart.post('/:cid/purchase', policies.handlePolicies(["USER"]),  cartController.purchaseProducts)

export default routerCart