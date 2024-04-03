import { Router } from "express";
import { getProducts, addCart, addProduct, deleteProduct, deleteProducts } from "../dao/db/controllers/cartController.js";

//IDs de carritos
//65cc0b29c5107242c849f70b
//65cc90030d43c6ca255667da
//65de190a08e5074ae91de2d6
//65de1959bf90cca4f2f98877

const routerCart = Router();

routerCart.get('/:cid', getProducts)
routerCart.post('/', addCart)
routerCart.post('/:cid/product/:pid', addProduct)
routerCart.delete('/:cid/products/:pid', deleteProduct)
routerCart.delete('/:cid', deleteProducts)

export default routerCart