import { handleUserError } from './handleUserResponse';
import { tenantContext } from '../credentials/tenantContext'
import { userType } from '../../types/userType';
import { Op } from 'sequelize';
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc : "ERROR")

export const handleUsers = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    //filters from the user
    let where: any = {}
    if (args.firstName && args.firstName !== "") { where.firstName = { [Op.iLike]: args.firstName + '%' } }
    if (args.lastName && args.lastName !== "") { where.lastName = { [Op.iLike]: args.lastName + '%' } }
    if (args.email && args.email !== "") { where.email = { [Op.iLike]: args.email + '%' } }

    try {
        const { userAirlineId } = await tenantContext(req, 'USERS')
        where.AirlineId = userAirlineId //tenant security filter

        const users: userType[] = models.User.findAll({
            limit: 100,
            where: where,
            order: [
                ['firstName', 'asc'],
                ['lastName', 'asc'],
            ]
        });

        return {
            success: true,
            message: 'Listado de usuarios',
            users
        }
    } catch (e: any) {
        return handleUserError(e)
    }
}

