import { Router } from "express";

const routerViews = Router();

//http://localhost:8080/views/realTimeProducts
routerViews.get('/realTimeProducts', (req, res)=>{
    res.render('home', {})
})

export default routerViews