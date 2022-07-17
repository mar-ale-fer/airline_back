import { flightType } from "../../types/flightType";
export class FlightError extends Error {
    flight: flightType
    constructor(message: string, flight: flightType) {
        super()
        this.message = message
        this.flight = flight
    }
}