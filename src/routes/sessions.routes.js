
import { Router } from "express";
import { UserManager } from "../dao/db/managers/userManager.js";
import users from "../dao/db/models/user.model.js";

const routerSessions = Router();
const userManager = new UserManager()

routerSessions.post('/register', async (req, res) => {
    userManager.addUser({ ...req.body, role: "Usuario" })

    res.redirect('/views/login')
})

//http://localhost:8080/views/login
routerSessions.post('/login', async (req, res) => {
    let user = req.body
    let userFound = await users.findOne({ email: user.email, password: user.password })


    if (userFound) {
        
        req.session.first_name = userFound.first_name,
        req.session.last_name = userFound.last_name,
        req.session.email = userFound.email,
        req.session.age = userFound.age,
        req.session.role = userFound.role,

        res.redirect('/views/realTimeProducts/?page=1')
        return
    }

    res.send("Usuario o contraseña incorrectos")

})

routerSessions.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send('Error en Logout')
        }else{
            res.redirect('/views/login')
        }

    })   
})

export default routerSessions