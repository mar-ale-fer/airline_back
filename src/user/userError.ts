import { userType } from "../../types/userType";
export class UserError extends Error {
    user : userType
    constructor ( message: string, user : userType) {
        super()
        this.message = message
        this.user = user
    }
}