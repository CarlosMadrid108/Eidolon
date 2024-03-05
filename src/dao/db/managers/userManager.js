import users from "../models/user.model.js"

export class UserManager {
    async addUser(user) {
            await users.create(user)
    }
}