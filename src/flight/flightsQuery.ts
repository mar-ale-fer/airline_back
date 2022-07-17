import { handleFlightError } from './handleFlightResponse'
import { tenantContext } from '../credentials/tenantContext'
import { flightType } from '../../types/flightType';
import { Op } from 'sequelize';
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc : "ERROR")

export const handleFlights = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    //filters from the user
    let where: any = {}
    if (args.name && args.name !== "") { where.name = { [Op.iLike]: args.name + '%' } }
    try {
        const { userAirlineId } = await tenantContext(req, 'FLIGHTS')
        where.AirlineId = userAirlineId //tenant security filter

        const flights: flightType[] = models.Flight.findAll({
            limit: 100,
            where: where,
            order: [
                ['name', 'asc']
            ]
        });

        return {
            success: true,
            message: 'Listado de niveles',
            flights
        }
    } catch (e: any) {
        return handleFlightError(e)
    }
}

