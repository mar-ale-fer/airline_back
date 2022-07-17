import { handleFlightError, handleFlightOk } from './handleFlightResponse'
import { tenantContext } from '../credentials/tenantContext'
import { FlightError } from './flightError';
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc : "ERROR")

export const handleFlightById = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    try {
        const { userAirlineId } = await tenantContext(req, 'FLIGHT_BY_ID')
        const flight = await models.Flight.findOne({
            where: {
                id: args.id,
                AirlineId: userAirlineId //tenant security check
            }
        })
        if (!flight) throw new FlightError('flight not found', { id: args.id, name: '', AirlineId: userAirlineId })
        return handleFlightOk('Flight', flight)
    } catch (e: any) {
        return handleFlightError(e)
    }
}