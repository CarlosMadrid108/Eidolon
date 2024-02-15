import { Router } from "express";

const routerViews = Router();

//http://localhost:8080/views/realTimeProducts
routerViews.get('/realTimeProducts', (req, res)=>{
    res.render('home', {})
})

//http://localhost:8080/views/chat
routerViews.get('/chat', (req, res)=>{
    res.render('chat', {})

})

export default routerViews