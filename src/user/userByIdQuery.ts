import { handleUserError, handleUserOk } from './handleUserResponse'
import { tenantContext } from '../credentials/tenantContext'
import { UserError } from './userError'
import { EmptyUser } from '../../types/userType'
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc : "ERROR")

export const handleUserById = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    try {
        const { userAirlineId } = await tenantContext(req, 'USER_BY_ID')
        const user = await models.User.findOne({
            where: {
                id: args.id,
                AirlineId: userAirlineId //tenant security check
            }
        })
        if (!user) throw new UserError('User not found', EmptyUser)
        return handleUserOk('User', user)
    } catch (e: any) {
        return handleUserError(e)
    }
}