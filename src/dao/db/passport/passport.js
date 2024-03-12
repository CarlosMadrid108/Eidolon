import passport from "passport";
import local from "passport-local"

import users from "../models/user.model.js";
import { createHash } from "../utils/bcrypt.js";
import { isValidPassword } from "../utils/bcrypt.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;
            try {
                let user = await users.findOne({ email: username });
                if (user) {
                    console.log('Usuario ya existe');
                    return done(null, false)
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    role: 'Usuario',
                }
                let result = await users.create(newUser)
                return done(null, result)
            } catch (error) {
                return done("Error al obtener usuario " + error)
            }
        }
    ))

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await users.findOne({ email: username })
            if (!user) {
                console.log("No existe el usuario");
                return done(null, false);
            }
            if (!isValidPassword(user, password)) return done(null, false);
            return done(null, user);
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });
    passport.deserializeUser((async (id, done) => {
        let user = await users.findById(id);
        done(null, user);
    }))
}

export default initializePassport




