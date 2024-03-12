import chat from '../models/chat.models.js'

export class ChatManager {

    async addMessage(msg){    
        await chat.create(msg)  
    }

    async showMessages(){
        const msgs = await chat.find();
        return msgs
    }
}