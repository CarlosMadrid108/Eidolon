export default class MongoSessionController {

    constructor(){}

    async register(req, res, next) {
        res.redirect('/views/login')
    }

    async failRegister(req, res, next) {
        console.log("Failed Strategy");
        res.send({ error: "Failed" });
    }

    async login(req, res, next) {
        if (!req.user) return res.status(400).send({ status: "error", error: "Invalid credentials" })
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            cart: req.user.cart,
            role: req.user.role,
        }
        //res.send("Inciaste Sesión")
        res.redirect('/views/realTimeProducts/?page=1')
    }

    async failLogin(req, res, next) {
        res.send({ error: "Failed Login" })
    }

    async callbackGithub (req, res, next) {
        req.session.user = req.user
    
        res.redirect('/views/realTimeProducts/?page=1')
    }

    async logout (req, res, next) {
        req.session.destroy(err => {
            if (err) {
                res.send('Error en Logout')
            } else {
                res.redirect('/views/login')
            }
    
        })
    }

    async current (req, res, next) {
        res.send({
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email
        })
    }

}