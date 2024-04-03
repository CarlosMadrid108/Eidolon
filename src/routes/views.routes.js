import { Router } from "express";
import { realTimeProducts, viewCart, chat, login, register, profile, error404 } from "../dao/db/controllers/viewsController.js";

const routerViews = Router();

function loggedOut(req, res, next) {
    if (req.session.user) {
        res.send('No tienes acceso')
    } else {
        next()
    }
}

function loggedIn(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        res.send('No tienes acceso')
    }
}

//http://localhost:8080/views/realTimeProducts/?page=1
routerViews.get('/realTimeProducts', loggedIn, realTimeProducts)

//http://localhost:8080/views/carts/65de1959bf90cca4f2f98877
routerViews.get('/carts/:cid', loggedIn, viewCart)

//http://localhost:8080/views/chat
routerViews.get('/chat', loggedIn, chat)

// adminCoder@coder.com
// adminCod3r123
//http://localhost:8080/views/login
routerViews.get('/login', loggedOut, login)

//http://localhost:8080/views/register
routerViews.get('/register', loggedOut, register)

//http://localhost:8080/views/profile
routerViews.get('/profile', loggedIn, profile)

routerViews.get('*', error404)

export default routerViews