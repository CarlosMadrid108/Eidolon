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
            res.status(200).send(change)
        } else {
            res.status(404).send(change)
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

    async uploadDocuments(req, res, next){
        const { uid } = req.params

        //console.log(req.files)
    
        if (!req.files) {
            return res.status(400).send({ status: "error", mensaje: "No se adjunto archivo." });
        }
        
        if(req.files.profile){
            
            for (const elem of req.files.profile){
    
                let file = {
                    name: elem.originalname,
                    reference: elem.path,
                    type: 'Foto de Perfil'
                }
    
                const user = await users.findById(uid)
                user.documents.push(file)
                await user.save();
            }
        }
    
        if(req.files.product){
            
            for (const elem of req.files.product){
    
                let file = {
                    name: elem.originalname,
                    reference: elem.path,
                    type: 'Producto'
                }
    
                const user = await users.findById(uid)
                user.documents.push(file)
                await user.save();
            }
        }
    
        if(req.files.id){
            
            for (const elem of req.files.id){
    
                let file = {
                    name: elem.originalname,
                    reference: elem.path,
                    type: 'Identificación'
                }
    
                const user = await users.findById(uid)
                user.documents.push(file)
                await user.save();
            }
        }
    
        if(req.files.home){
            
            for (const elem of req.files.home){
    
                let file = {
                    name: elem.originalname,
                    reference: elem.path,
                    type: 'Comprobante de domicilio'
                }
    
                const user = await users.findById(uid)
                user.documents.push(file)
                await user.save();
            }
        }
    
        if(req.files.account){
            
            for (const elem of req.files.account){
    
                let file = {
                    name: elem.originalname,
                    reference: elem.path,
                    type: 'Comprobante de estado de cuenta'
                }
    
                const user = await users.findById(uid)
                user.documents.push(file)
                await user.save();
            }
        }
        
        res.send({ status: "Success", message: `Documentos agregados con éxito` });
    }

    async deleteUser(req, res, next){
        const {uid} = req.params

        const user = await userServices.delete(uid)

        if(user){
            res.send({ status: "Success", message: `Usuario eliminado con éxito` });
        } else {
            res.status(404).send("No se encuentra el usuario")
        }
    }

    async findUserbyEmail(req, res, next){

        const email = req.body

        const user = await userServices.findByEmail({email: email.email})

        if(user){
            res.status(200).send(user)
        } else {
            res.status(404).send("No se encuentra el usuario")
        }

    }

    async getAllUsers(req, res, next){
        const allUsers = await userServices.getUsers()
        if(allUsers){
            res.status(200).send(allUsers)
        } else {
            res.status(500).send("Error inesperado en el servidor")
        }

    }

    async deleteInactiveUsers(req, res, next){
        const result = await userServices.deleteInactive()

        if(result){
            res.status(204).send("Usuarios eliminados con éxito ")
        } else {
            res.status(500).send("Error inesperado en el servidor")
        }
    }

}