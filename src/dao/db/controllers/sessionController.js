
export const register = async (req, res, next) => {
    res.redirect('/views/login')
}

export const failRegister = async (req, res, next) => {
    console.log("Failed Strategy");
    res.send({error:"Failed"});
}

export const login = async (req, res, next) => {
        if(!req.user) return res.status(400).send({status:"error", error: "Invalid credentials"})
        req.session.user = {
            first_name : req.user.first_name,
            last_name : req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            cart: req.user.cart,
            role: req.user.role,
        }
        res.redirect('/views/realTimeProducts/?page=1')
        //res.redirect('/api/sessions/current')      
}

export const failLogin = async (req, res, next) => {
    res.send({error:"Failed Login"})
}

export const callbackGithub = async (req, res, next) => {
    req.session.user = req.user

    res.redirect('/views/realTimeProducts/?page=1')  
    // res.setHeader('Content-Type', 'application/json');
    // return res.status(200).json({payload:req.user})
}

export const logout = async (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            res.send('Error en Logout')
        } else {
            res.redirect('/views/login')
        }

    })
}

export const current = async (req, res, next) => {
    res.send(req.session.user)
}