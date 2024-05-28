import passport from "passport";
import local from "passport-local"
import GitHubStrategy from "passport-github2"

import users from "../models/user.model.js";
import { CartServices } from "../services/cartServices.js";
import { createHash } from "../utils/bcrypt.js";
import { isValidPassword } from "../utils/bcrypt.js";
import { logger } from "../../../config/logger.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {

    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;
            try {  
                const cartServices = new CartServices       
                let myCart = await cartServices.createCart();
                let user = await users.findOne({ email: username });
                if (user) {
                    logger.warning(`Usuario ya existe - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
                    return done(null, false)
                }

                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    cart: myCart._id,
                    resetPasswordToken: null,
                    resetPasswordExpires: null
                }
                let result = await users.create(newUser)
                return done(null, result)
            } catch (error) {
                logger.error(`${error} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
                return done("Error al obtener usuario " + error)
            }
        }
    ))

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await users.findOne({ email: username })
            if (!user) {
                logger.warning(`No existe es usuario - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
                return done(null, false);
            }
            if (!isValidPassword(user, password)) return done(null, false);
            return done(null, user);
        } catch (error) {
            logger.error(`${error} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
            return done(error)
        }
    }))

//Para el caso de los usuarios de github que no tienen configurado su "Public email"
//email aparece como email:null
//Tuve que modificiar mi perfil para poder enviar ese dato
    passport.use('github', new GitHubStrategy(
        {
            clientID:"Iv1.d34042c07954e8e3",
            clientSecret:"77166bb7330826e9b9e0ce247ae62ce2dfbe913b",
            callbackURL:"http://localhost:8080/api/sessions/callbackGithub",
        },
        async(accessToken, refreshToken, profile, done)=>{
            try {
                const cartServices = new CartServices       
                let myCart = await cartServices.createCart();

                let {name, email} = profile._json
                let usuario = await users.findOne({email})
                if(!usuario){
                    usuario = await users.create(
                        {
                            first_name: name,
                            last_name: "",
                            age: 18,
                            email,
                            github: profile,
                            password:"",
                            cart: myCart._id
                        }
                    )

                }
                return done(null, usuario)
            } catch (error) {
                logger.error(`${error} - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
                return done(error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });
    passport.deserializeUser((async (id, done) => {
        let user = await users.findById(id);
        done(null, user);
    }))
}

export default initializePassport




