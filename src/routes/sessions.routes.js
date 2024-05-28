import passport from "passport";
import { Router } from "express";
import { loginStrategy, registerStrategy } from "../dao/factory.js";
import { SessionConstructors } from "../dao/factory.js";
import { handlePolicies, onlyGuests } from "../dao/db/config/policies.js";

const routerSessions = Router();
const sessionController = new SessionConstructors

routerSessions.post('/register', onlyGuests, passport.authenticate(registerStrategy,{failureRedirect:'/api/sessions/failregister'}), sessionController.register)
routerSessions.get('/failregister', onlyGuests, sessionController.failRegister)
routerSessions.post('/login', onlyGuests, passport.authenticate(loginStrategy, {failureRedirect:'/api/sessions/faillogin'}), sessionController.login)
routerSessions.get('/faillogin', onlyGuests, sessionController.failLogin)
routerSessions.get('/github', onlyGuests, passport.authenticate('github', {}), (req, res)=>{})
routerSessions.get('/callbackGithub', onlyGuests, passport.authenticate('github', {}), sessionController.callbackGithub)
routerSessions.get('/logout', handlePolicies(["user","admin","premium"]), sessionController.logout)
routerSessions.get('/current', handlePolicies(["user","admin","premium"]), sessionController.current)

export default routerSessions