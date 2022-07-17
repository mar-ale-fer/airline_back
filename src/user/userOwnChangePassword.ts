import { userType } from '../../types/userType'
import { handleUserError, handleUserOk } from './handleUserResponse'
import { tenantContext } from '../credentials/tenantContext'
import { UserError } from './userError'
import { EmptyUser } from '../../types/userType'
import bcrypt from 'bcrypt'
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc : "ERROR")

export const handleUserOwnChangePassword = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    try {
        const { userAirlineId, sessionUser } = await tenantContext(req, 'USER_OWN_CHANGE_PASSWORD')
        console.log(args)
        const userToUpdate = await models.User.findOne({
            where: {
                email: sessionUser && sessionUser.email, //the user change his own password
                AirlineId: userAirlineId //tenant security check
            }
        })
        if (!userToUpdate) throw new UserError("User not found", EmptyUser)
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        const hashedPassword: string = await bcrypt.hash(args.Password, salt);

        userToUpdate.password = hashedPassword
        userToUpdate.mustChangePassword = false
        await userToUpdate.save()
        return handleUserOk('Modified own password', userToUpdate)

    } catch (e: any) {
        return handleUserError(e)
    }
}