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

}