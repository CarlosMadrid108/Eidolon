
import chat from '../models/chat.models.js'
import { io } from '../../../index.js'



export class ChatServices {

    async addMessage(msg) {

        await chat.create(msg)
        const msgs = await chat.find();
        io.emit('mensajes', msgs)
        return true
    }

    async showMessages() {
        const msgs = await chat.find();
        return msgs
    }
}