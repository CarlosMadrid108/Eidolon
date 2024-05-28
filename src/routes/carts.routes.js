import { Router } from "express";
import { CartConstructors } from "../dao/factory.js";
import { handlePolicies } from "../dao/db/config/policies.js";

const cartController = new CartConstructors;
const routerCart = Router();

routerCart.get('/:cid', handlePolicies(["user","premium"]), cartController.getProducts)
routerCart.post('/', handlePolicies(["admin"]), cartController.addCart)
routerCart.post('/:cid/product/:pid', handlePolicies(["user","premium"]), cartController.addProduct)
routerCart.delete('/:cid/products/:pid', handlePolicies(["user","premium"]), cartController.deleteProduct)
routerCart.delete('/:cid', handlePolicies(["user","premium"]), cartController.deleteProducts)
routerCart.post('/:cid/purchase', handlePolicies(["user","premium"]),  cartController.purchaseProducts)

export default routerCart