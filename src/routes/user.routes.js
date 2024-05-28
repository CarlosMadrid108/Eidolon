import { Router } from "express";
import { UserConstructors } from "../dao/factory.js";
import { handlePolicies, onlyGuests } from "../dao/db/config/policies.js";

const routerUsers = Router();

const userController = new UserConstructors

routerUsers.post('/manage/requestResetPasword', onlyGuests, userController.requestResetPass)
routerUsers.post('/manage/resetPassword/:token', onlyGuests, userController.resetPassword)
routerUsers.post('/addFields', handlePolicies(["admin"]), userController.addFieldsToAll)
routerUsers.post('/premium/:uid', userController.changeRole)

export default routerUsers






