import { Router } from "express";
import { ViewsController } from "../dao/db/controllers/viewsController.js";
import { handlePolicies, onlyGuests } from "../dao/db/config/policies.js";

const routerViews = Router();
const viewsController = new ViewsController

//http://localhost:8080/views/realTimeProducts/?page=1
routerViews.get('/realTimeProducts', handlePolicies(["user","admin","premium"]), viewsController.realTimeProducts)

//http://localhost:8080/views/carts/65de1959bf90cca4f2f98877
routerViews.get('/carts/:cid', handlePolicies(["user","premium"]), viewsController.viewCart)

//http://localhost:8080/views/chat
routerViews.get('/chat', handlePolicies(["user","admin","premium"]), viewsController.chat)

// adminCoder@coder.com
// adminCod3r123
//http://localhost:8080/views/login
routerViews.get('/login', onlyGuests, viewsController.login)

//http://localhost:8080/views/register
routerViews.get('/register', onlyGuests, viewsController.register)

routerViews.get('/resetPasswordRequest', onlyGuests, viewsController.resetPasswordRequest)

routerViews.get('/resetPassword/:token', onlyGuests, viewsController.resetPassword)

//http://localhost:8080/views/profile
routerViews.get('/profile', handlePolicies(["user", "admin","premium"]), viewsController.profile)
routerViews.get('/manageUser/:uid',  viewsController.manageUser)

routerViews.get('*', viewsController.error404)

export default routerViews