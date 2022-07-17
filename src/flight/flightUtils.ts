import models from '../../models';
import { FlightError } from './flightError';
import { flightType } from '../../types/flightType';

export const flightExists = async (flight: flightType) => {
    const flightFound = await models.Flight.findOne({
        where: {
            name: flight.name,
            AirlineId: flight.AirlineId  //tenant security check
        }
    })
    if (flightFound) throw new FlightError('The flight already exists', { ...flight, id: 0 })
}
