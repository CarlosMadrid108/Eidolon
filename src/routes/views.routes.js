import { Router } from "express";

const routerViews = Router();

routerViews.get('/realTimeProducts', (req, res)=>{
    res.render('home', {})
})

export default routerViews