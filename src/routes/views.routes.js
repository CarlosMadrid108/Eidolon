import { Router } from "express";
import { ProductManager } from "../dao/db/managers/productManager.js";
import { CartManager } from "../dao/db/managers/cartManager.js";

const productManager = new ProductManager()
const cartManager = new CartManager()

const routerViews = Router();

function loggedOut (req, res, next){
    if (!req.session.email){
        next()
    }else{
        res.send('No tienes acceso')
    }
}

function loggedIn (req, res, next){
    if (req.session.email){
        next()
    }else{
        res.send('No tienes acceso')
    }
}

//http://localhost:8080/views/realTimeProducts/?page=1
routerViews.get('/realTimeProducts', loggedIn, async (req, res) => {
    let { limit } = req.query
    let { category } = req.query
    let { page } = req.query
    let { sort } = req.query
 
    const prods = await productManager.getProducts(limit, category, page, sort)
    .then(res.render('home', {first_name: req.session.first_name}))
})

//http://localhost:8080/views/carts/65de1959bf90cca4f2f98877
routerViews.get('/carts/:cid', loggedIn, async (req, res) => {
    const {cid} = req.params
    const prods = await cartManager.getProducts(cid)
    .then(res.render('cart', {}))
})

//http://localhost:8080/views/chat
routerViews.get('/chat', loggedIn, (req, res) => {
    res.render('chat', {})

})

//http://localhost:8080/views/login
routerViews.get('/login', loggedOut, (req, res) => {
    res.render('login', {})
})

//http://localhost:8080/views/register
routerViews.get('/register', loggedOut, (req, res) => {
    res.render('register', {})
})

//http://localhost:8080/views/profile
routerViews.get('/profile', loggedIn, (req, res) => {
    res.render('profile', {
        first_name: req.session.first_name,
        last_name: req.session.last_name,
        email: req.session.email,
        age: req.session.age,
        role: req.session.role,
    })

})


export default routerViews