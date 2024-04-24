import { Router } from "express";
import { ViewsController } from "../dao/db/controllers/viewsController.js";
import { PoliciesContructor } from "../dao/factory.js";

const routerViews = Router();
const viewsController = new ViewsController
const policies = new PoliciesContructor

//http://localhost:8080/views/realTimeProducts/?page=1
routerViews.get('/realTimeProducts', policies.handlePolicies(["USER", "ADMIN"]), viewsController.realTimeProducts)

//http://localhost:8080/views/carts/65de1959bf90cca4f2f98877
routerViews.get('/carts/:cid', policies.handlePolicies(["USER", "ADMIN"]), viewsController.viewCart)

//http://localhost:8080/views/chat
routerViews.get('/chat', viewsController.chat)

// adminCoder@coder.com
// adminCod3r123
//http://localhost:8080/views/login
routerViews.get('/login', policies.handlePolicies(["PUBLIC", "ADMIN"]),viewsController.login)

//http://localhost:8080/views/register
routerViews.get('/register', policies.handlePolicies(["PUBLIC", "ADMIN"]), viewsController.register)

//http://localhost:8080/views/profile
routerViews.get('/profile', policies.handlePolicies(["USER", "ADMIN"]), viewsController.profile)

routerViews.get('*', viewsController.error404)

export default routerViews