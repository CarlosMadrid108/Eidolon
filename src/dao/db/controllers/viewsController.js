import { CartServices } from "../services/cartServices.js";
import { ProductServices } from "../services/productServices.js";

const productServices = new ProductServices
const cartServices = new CartServices

export class ViewsController {

    async realTimeProducts (req, res, next) {
        let { limit } = req.query
        let { category } = req.query
        let { page } = req.query
        let { sort } = req.query
    
        let cart = req.session.user.cart
    
        const prods = await productServices.paginateProducts(limit, category, page, sort)
            .then(res.render('home', { 
                first_name: req.session.user.first_name,
                cart,
             }))
    }

    async viewCart (req, res, next) {
        const { cid } = req.params
        const prods = await cartServices.findProducts(cid)
            .then(res.render('cart', {id: cid}))
    }
    
    async chat (req, res, next) {
        if(!req.session.user || req.session.user.role === "admin"){
            res.render('noPostingChat', {})
            return
        }
        res.render('chat', {})
    }

    async login (req, res, next) {
        res.render('login', {})
    }
    async register (req, res, next) {
        res.render('register', {})
    }

    async profile (req, res, next) {
        res.render('profile', {
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email,
            age: req.session.user.age,
            role: req.session.user.role,
        })
    }

    async error404 (req, res, next) {
        res.status(404).render('404', {})
    }
}

export const realTimeProducts = async (req, res, next) => {
    let { limit } = req.query
    let { category } = req.query
    let { page } = req.query
    let { sort } = req.query

    let cart = req.session.user.cart

    const prods = await productServices.paginateProducts(limit, category, page, sort)
        .then(res.render('home', { 
            first_name: req.session.user.first_name,
            cart,
         }))
}

export const viewCart = async (req, res, next) =>{
    const { cid } = req.params
    const prods = await cartServices.findProducts(cid)
        .then(res.render('cart', {}))
}

export const chat = async (req, res, next) => {
    
    if(!req.session.user || req.session.user.role === "admin"){
        res.render('noPostingChat', {})
    }
    res.render('chat', {})
}

export const login = async (req, res, next) => {
    res.render('login', {})
}

export const register = async (req, res, next) => {
    res.render('register', {})
}

export const profile = async (req, res, next) => {
    res.render('profile', {
        first_name: req.session.user.first_name,
        last_name: req.session.user.last_name,
        email: req.session.user.email,
        age: req.session.user.age,
        role: req.session.user.role,
    })
}

export const error404 = async (req, res, next) => {
    res.status(404).render('404', {})
}