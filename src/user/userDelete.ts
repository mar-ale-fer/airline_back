import { handleUserError, handleUserOk } from './handleUserResponse'
import { tenantContext } from '../credentials/tenantContext'
import { UserError } from './userError'
import { EmptyUser } from '../../types/userType'
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc : "ERROR")

export const handleUserDelete = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    try {
        const { userAirlineId } = await tenantContext(req, 'USER_DELETE')
        const userToDelete = await models.User.findOne({
            where: {
                id: args.id,
                AirlineId: userAirlineId //tenant security check
            }
        })
        if (!userToDelete) throw new UserError('User not found', EmptyUser)
        await userToDelete.destroy()
        return handleUserOk('User Deleted', userToDelete)
    } catch (e: any) {
        return handleUserError(e)
    }
}

