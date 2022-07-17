import { userType } from "../../../types/userType"
import models from '../../../models'
import bcrypt from 'bcrypt'


export const insertUser = async (newUser: userType) => {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password

    const hashedPassword: string = await bcrypt.hash(newUser.password || "", salt);

    const userWithHashedPassword = {
        ...newUser,
        password: hashedPassword
    }
    try {
        const insert_newUser = await models.User.create(userWithHashedPassword)
        console.log(`userid:${insert_newUser.dataValues.id}, email:${newUser.email}`)
    } catch (error: any) {
        console.error(error)
    }
}
