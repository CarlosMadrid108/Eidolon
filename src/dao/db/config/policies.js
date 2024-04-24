export class MongoPolicies {
    constructor() { }

    handlePolicies = policies => (req, res, next) => {

        if (policies[0] === "USER" && policies[1] === "ADMIN") {
            if (req.session.user) {
                next()
            } else {
                res.send("No tienes acceso")
            }
        }

        if (policies[0] === "PUBLIC" && policies[1] === "ADMIN") {
            if (!req.session.user || req.session.user.role === "admin") {
                next()
            } else {
                res.send("No tienes acceso")
            }
        }

        if (policies[0] === "ADMIN") {
            if (!req.session.user) {
                res.send("No tienes autorización")
                return

            } else if (req.session.user.role === "admin") {
                next()
           
            } else {
                res.send("No tienes autorización")
            }
        }
    }
}

export const onlyUSer = (req, res, next) => {
    if (req.session.user){
        if (req.session.user.role === admin){
            res.send("No autorizado")
        }
        next()
    }
}