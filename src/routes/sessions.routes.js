import passport from "passport";
import { Router } from "express";
import { loginStrategy, registerStrategy } from "../dao/factory.js";
import { SessionConstructors } from "../dao/factory.js";
import { PoliciesContructor } from "../dao/factory.js";

const routerSessions = Router();
const sessionController = new SessionConstructors
const policies = new PoliciesContructor

// adminCoder@coder.com
// adminCod3r123

routerSessions.post('/register', policies.handlePolicies(["PUBLIC","ADMIN"]), passport.authenticate(registerStrategy,{failureRedirect:'/api/sessions/failregister'}), sessionController.register)
routerSessions.get('/failregister', policies.handlePolicies(["PUBLIC","ADMIN"]), sessionController.failRegister)
routerSessions.post('/login', policies.handlePolicies(["PUBLIC","ADMIN"]), passport.authenticate(loginStrategy, {failureRedirect:'/api/sessions/faillogin'}), sessionController.login)
routerSessions.get('/faillogin', policies.handlePolicies(["PUBLIC","ADMIN"]), sessionController.failLogin)
routerSessions.get('/github', policies.handlePolicies(["PUBLIC","ADMIN"]), passport.authenticate('github', {}), (req, res)=>{})
routerSessions.get('/callbackGithub', policies.handlePolicies(["PUBLIC","ADMIN"]), passport.authenticate('github', {}), sessionController.callbackGithub)
routerSessions.get('/logout', policies.handlePolicies(["USER", "ADMIN"]), sessionController.logout)
routerSessions.get('/current', policies.handlePolicies(["USER", "ADMIN"]), sessionController.current)

export default routerSessions