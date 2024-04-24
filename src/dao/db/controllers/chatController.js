import { ChatServices } from "../services/chatServices.js";

const chatServices = new ChatServices

export default class MongoChatController {
    constructor() { }

    async addMessages(req, res, next) {
        try {
            const msg = req.body
            await chatServices.addMessage(msg)
        }
        catch(err){
            res.send(err)
        }
    }
}