
import chat from '../models/chat.models.js'

export class ChatServices {

    async addMessage(msg) {
        await chat.create(msg)
    }

    async showMessages() {
        const msgs = await chat.find();
        return msgs
    }
}