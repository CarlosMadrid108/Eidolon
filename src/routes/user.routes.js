import { Router } from "express";
import { UserConstructors } from "../dao/factory.js";
import { handlePolicies, onlyGuests } from "../dao/db/config/policies.js";
import { uploader } from "../dao/db/utils/multer.js";

const routerUsers = Router();

const userController = new UserConstructors

routerUsers.post('/manage/requestResetPasword', onlyGuests, userController.requestResetPass)
routerUsers.post('/manage/resetPassword/:token', onlyGuests, userController.resetPassword)
routerUsers.post('/manage/delete/:uid', handlePolicies(["admin"]), userController.deleteUser)
routerUsers.get('/manage/searchByEmail', userController.findUserbyEmail)
routerUsers.post('/addFields', handlePolicies(["admin"]), userController.addFieldsToAll)
routerUsers.post('/premium/:uid', handlePolicies(["admin"]), userController.changeRole)
routerUsers.get('/', handlePolicies(["admin"]), userController.getAllUsers)
routerUsers.delete('/', handlePolicies(["admin"]), userController.deleteInactiveUsers)


routerUsers.post("/:uid/documents", uploader.fields(

    [
        {
            name: 'profile'
        },
        {
            name: 'product'
        },

        {
            name: 'id'
        },
        {
            name: 'home'
        },
        {
            name: 'account'
        }
    ]

), userController.uploadDocuments)

export default routerUsers






