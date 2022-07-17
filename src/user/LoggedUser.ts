import { handleUserError, handleUserOk } from './handleUserResponse'
import { tenantContext } from '../credentials/tenantContext'
import { UserError } from './userError'
import { EmptyUser } from '../../types/userType'
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc : "ERROR")

export const handleLoggedUser = async (_: any, args: any, { models, req }: { models: any, req: any }) => {

    try {
        const { userAirlineId, sessionUser } = await tenantContext(req, 'LOGGED_USER')
        const user = await models.User.findOne({
            where: {
                email: sessionUser && sessionUser.email,
                AirlineId: userAirlineId //tenant security check
            }
        })
        if (!user) throw new UserError('User not found', EmptyUser)
        return handleUserOk('User logged in', user)
    } catch (e: any) {
        return handleUserError(e)
    }
}