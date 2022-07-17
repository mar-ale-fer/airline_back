import { handleFlightError, handleFlightOk } from './handleFlightResponse'
import { tenantContext } from '../credentials/tenantContext'
import { FlightError } from './flightError';
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc : "ERROR")

export const handleFlightDelete = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    try {
        const { userAirlineId } = await tenantContext(req, 'FLIGHT_DELETE')
        const flightToDelete = await models.Flight.findOne({
            where: {
                id: args.id,
                AirlineId: userAirlineId //tenant security check
            }
        })
        if (!flightToDelete) throw new FlightError('Flight not found', { id: args.id, name: '', AirlineId: userAirlineId })
        await flightToDelete.destroy()
        return handleFlightOk('Flight deleted', flightToDelete)
    } catch (e: any) {
        return handleFlightError(e)
    }
}

