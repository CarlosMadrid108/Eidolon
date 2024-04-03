
import passport from "passport";
import { Router } from "express";
import { register, login, failRegister, failLogin, callbackGithub, logout, current } from "../dao/db/controllers/sessionController.js";

const routerSessions = Router();

routerSessions.post('/register', passport.authenticate('register',{failureRedirect:'/api/sessions/failregister'}), register)
routerSessions.get('/failregister', failRegister)
routerSessions.post('/login', passport.authenticate('login', {failureRedirect:'/api/sessions/faillogin'}), login)
routerSessions.get('/faillogin', failLogin)
routerSessions.get('/github', passport.authenticate('github', {}), (req, res)=>{})
routerSessions.get('/callbackGithub', passport.authenticate('github', {}), callbackGithub)
routerSessions.get('/logout', logout)
routerSessions.get('/current', current)

export default routerSessions