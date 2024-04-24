import { Router } from "express";
import { ChatConstructors } from "../dao/factory.js";

const chatController = new ChatConstructors

const routerChat = Router();

routerChat.post('/addMessage', chatController.addMessages)


export default routerChat
