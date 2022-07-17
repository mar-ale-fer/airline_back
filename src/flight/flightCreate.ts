import { flightType } from '../../types/flightType'
import { flightExists } from './flightUtils'
import { handleFlightError, handleFlightOk } from './handleFlightResponse'
import { tenantContext } from '../credentials/tenantContext'
import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc : "ERROR")
export const handleFlightCreate = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    try {
        const { userAirlineId } = await tenantContext(req, 'FLIGHT_CREATE')

        const newFlight: flightType = {
            id: null,
            name: args.name,
            AirlineId: userAirlineId
        }
        await flightExists(newFlight)
        const insertedFlight = await models.Flight.create(newFlight)
        return handleFlightOk('Flight created', insertedFlight)
    } catch (e: any) {
        return handleFlightError(e)
    }
}