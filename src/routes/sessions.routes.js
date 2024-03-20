
import { Router } from "express";
import passport from "passport";

const routerSessions = Router();


routerSessions.post('/register', passport.authenticate('register',{failureRedirect:'/api/sessions/failregister'}), async (req, res) => {
    res.redirect('/views/login')
})

routerSessions.get('/failregister', async(req, res)=>{
    console.log("Failed Strategy");
    res.send({error:"Failed"});
})


routerSessions.post('/login', passport.authenticate('login', {failureRedirect:'/api/sessions/faillogin'}), async (req, res) => {
    if(!req.user) return res.status(400).send({status:"error", error: "Invalid credentials"})
    req.session.user = {
        first_name : req.user.first_name,
        last_name : req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        cart: req.user.cart,
        role: req.user.role,
    }
    //res.redirect('/views/realTimeProducts/?page=1')
    res.redirect('/api/sessions/current')  
})

routerSessions.get('/faillogin', (req, res)=> {
    res.send({error:"Failed Login"})
})

routerSessions.get('/github', passport.authenticate('github', {}), (req, res)=>{})
routerSessions.get('/callbackGithub', passport.authenticate('github', {}), (req, res)=>{

    req.session.user = req.user

    res.redirect('/views/realTimeProducts/?page=1')  
    // res.setHeader('Content-Type', 'application/json');
    // return res.status(200).json({payload:req.user})
})

routerSessions.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send('Error en Logout')
        } else {
            res.redirect('/views/login')
        }

    })
})

routerSessions.get('/current', (req, res) => {
    res.send(req.session.user)
})

export default routerSessions