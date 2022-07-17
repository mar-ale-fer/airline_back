import log from 'loglevel'
import { FlightError } from './flightError'
import { flightType } from '../../types/flightType'
export const handleFlightError = (e: Error) => {
    log.error(e)
    //const message = e.name === 'SequelizeUniqueConstraintError'? 'Ya existe el nivel que intentas crear' : e.message

    if (e instanceof FlightError) {
        return {
            success: false,
            message: `${e.message}`,
            flight: e.flight
        }
    }
    return {
        success: false,
        message: `${e.message}`,
        flight: {
            id: 0,
            name: ''
        }
    }
}

export const handleFlightOk = (message: string, flight: flightType) => ({
    success: true,
    message,
    flight
})