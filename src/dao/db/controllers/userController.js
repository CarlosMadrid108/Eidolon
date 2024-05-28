import { UserServices } from "../services/userServices.js";
import users from "../models/user.model.js";
import bcrypt from "bcrypt"


const userServices = new UserServices

export default class MongoUserController {
    constructor() { }

    async requestResetPass(req, res, next) {
        const email = req.body

        const request = await userServices.requestResetPassword(email)

        if (request) {
            res.status(200).send("Revise su correo electrónico")
        } else {
            res.status(404).send("No existe el usuario")
        }
    }

    async resetPassword(req, res, next) {
        const { token } = req.params;
        const  newPassword  = req.body;

        const user = await users.findOne({resetPasswordToken: token})

        if (user) {

            const existsPass = bcrypt.compareSync(newPassword.password, user.password)

            if(existsPass){
                res.status(404).send("La contraseña no puede ser igual a la anterior")
                return
            }
    
            const request = await userServices.resetPass(token, newPassword)
            if (request){
                res.status(200).send("Se ha cambiado la contraseña")
                
            } else {
                res.status(404).send("El enlace ha expirado")
            }
            

        } else {
            res.status(404).send("El enlace ha expirado")
        }
    }

    async changeRole (req, res, next){
        const { uid } = req.params

        const change = await userServices.changeRole(uid)

        if (change) {
            res.status(200).send("Usuario actualizado")
        } else {
            res.status(404).send("Error al actualizar / El usuario no existe")
        }
    }

    async addFieldsToAll(req, res, next) {
        const field = req.body

        const update = await userServices.addFieldsToAllUsers(field)

        if (update) {
            res.status(200).send("Usuarios actualizados")
        } else {
            res.status(404).send("Error al actualizar")
        }

    }
}