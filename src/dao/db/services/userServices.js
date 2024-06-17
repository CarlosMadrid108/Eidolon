import users from "../models/user.model.js";
import crypto from 'crypto';
import config from "../../../config/config.js";
import transporter from "../../../config/nodemailer.js";
import { createHash } from "../utils/bcrypt.js";
import { logger } from "../../../config/logger.js";

export class UserServices {

    async requestResetPassword(email) {
        try {
            console.log(email)
            const user = await users.findOne({ email: email.email });

            if (!user) {
                return false
            }

            const token = crypto.randomBytes(20).toString('hex');
            const expires = Date.now() + 3600000;

            user.resetPasswordToken = token;
            user.resetPasswordExpires = expires;
            await user.save();

            const resetUrl = `http://localhost:${config.port}/views/resetPassword/${token}`;

            const mailOptions = {
                to: user.email,
                from: 'Eidolon <cmadrid1985@gmail.com>',
                subject: 'Reinicio de contraseña',
                text: `Ha recibido este correo porque usted (u otra persona) ha solicitado el reinicio de la contraseña de su cuenta.\n\n
              Por favor, clic en el siguiente enlace o cópielo en su navegador para completar el proceso:\n\n
              ${resetUrl}\n\n
             Si usted no lo solicitó, por favor ignore este correo y su contraseña no será modificada.\n`,
            };

            transporter.sendMail(mailOptions);

            return true
        } catch (err) {
            logger.error(`${err} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
            return false
        }
    }

    async resetPass(token, newPassword) {
        try {
            const user = await users.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() },
            });

            if (!user) {
                return false;
            }

            user.password = createHash(newPassword.password);
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;
            await user.save();
            logger.info(`User (_id: ${user._id}) changed the password - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

            return true
        } catch (err) {
            logger.error(`${err} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
            return false
        }

    }

    async changeRole(uid){
        try{

            const user = await users.findById(uid)

            if(!user){
                logger.info(`User (_id: ${user._id}) doesn't exist - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
                return false
            }
            
            if (user.role==="user"){

                console.log(user.documents)

                const id = user.documents.find(({ type }) => type === "Identificación");
                const home = user.documents.find(({ type }) => type === "Comprobante de domicilio");
                const account = user.documents.find(({ type }) => type === "Comprobante de estado de cuenta");

                if(!id || !home || !account){
                    logger.info(`user does not meet the requirements  - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
                    return false
                }

                user.role = "premium"
                await user.save()
                logger.info(`User (_id: ${user._id}) role modified - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
                return true
            } else {
                user.role = "user"
                await user.save()
                logger.info(`User (_id: ${user._id}) role modified - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
                return true
            }

        }catch(err){
            logger.error(`${err} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
            return false
        }

    }

    async addFieldsToAllUsers(field) {
        try {
            console.log('Intentando actualizar todos los usuarios');
            const result = await users.updateMany({}, {
                $set: field
            });
            console.log('Resultado de la actualización:', result);
            return true
        } catch (err) {
            logger.error(`${err} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
            return false
        }
    }

}