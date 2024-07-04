import { CartServices } from "../services/cartServices.js";
import { ProductServices } from "../services/productServices.js";
import users from "../models/user.model.js";

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

    async resetPasswordRequest (req, res, next) {
        res.render('resetPaswordRequest', {})
    }

    async resetPassword (req, res, next) {
        const { token } = req.params

        const user = await users.findOne({resetPasswordToken: token})

        if(!user){
            res.redirect('/views/resetPasswordRequest')
            return
        }

        if (user.resetPasswordExpires < Date.now()){
            res.redirect('/views/resetPasswordRequest')
            return
        }

        res.render('resetPassword', {
            token: token
        })
    }

    async manageUser (req, res, next) {
        const { uid } = req.params

        const user = await users.findById(uid)

        if (!user){
            res.status(404).send("Usuario no encontrado")

            return
        }

        console.log(user)

        res.render('manageUsers', {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            role: user.role,
            id: uid
        })

        //res.send(user)
    }

    async error404 (req, res, next) {
        res.status(404).render('404', {})
    }

}