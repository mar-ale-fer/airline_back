import { flightExists } from './flightUtils'
import { handleFlightError, handleFlightOk } from './handleFlightResponse'
import { tenantContext } from '../credentials/tenantContext'
import { FlightError } from './flightError';
import { flightType } from '../../types/flightType'

import log from 'loglevel'
log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL as log.LogLevelDesc : "ERROR")

export const handleFlightUpdate = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    try {
        const { userAirlineId } = await tenantContext(req, 'FLIGHT_UPDATE')
        const newFlight: flightType = {
            id: args.id,
            name: args.name,
            AirlineId: userAirlineId
        }
        await flightExists(newFlight) //exists level with the same name
        const flightToUpdate = await models.Flight.findOne({
            where: {
                id: newFlight.id,
                AirlineId: userAirlineId //tenant security check
            }
        })
        if (!flightToUpdate) throw new FlightError('flight not found', newFlight)
        flightToUpdate.name = newFlight.name
        await flightToUpdate.save()
        return handleFlightOk('Flight updated', flightToUpdate)
    } catch (e: any) {
        return handleFlightError(e)
    }
}

