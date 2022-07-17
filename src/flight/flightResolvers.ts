import { handleFlightCreate } from './flightCreate'
import { handleFlightUpdate } from './flightUpdate'
import { handleFlightDelete } from './flightDelete'
import { handleFlights } from './flightsQuery'
import { handleFlightById } from './flightByIdQuery'
export const resolvers = {
    Query: {
        flights: handleFlights,
        flightById: handleFlightById
    },
    Mutation: {
        flightCreate: handleFlightCreate,
        flightUpdate: handleFlightUpdate,
        flightDelete: handleFlightDelete
    }
}