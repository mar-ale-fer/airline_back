import { commentType } from "../../types/commentType";
import { handleFlightError, handleFlightOk } from "./handleFlightResponse";
import { EmptyFlight } from "../../types/flightType";
import { tenantContext } from "../credentials/tenantContext";
import log from 'loglevel';
import { FlightError } from "./flightError";

export const handleAddCommentToFlight = async (_: any, args: any, { models, req }: { models: any, req: any }) => {
    try {
        console.log("algo---------------")
        const { userAirlineId, sessionUser } = await tenantContext(req, 'FLIGHT_ADD_COMMENT')

        console.log(args)
        //Check if the rol is valid 
        const flightId = args.flightId
        const text = args.text
        const tags = args.tags
        if (!flightId) throw new FlightError("You must indicate a flight", EmptyFlight);
        const user = await models.User.findOne({
            where: {
                email: (sessionUser?.email as string).toLowerCase(), //the email is ever stored in lowercase
            }
        });
        const flightToUpdate = await models.Flight.findByPk(flightId);

        if (!flightToUpdate) throw new FlightError("Flight not found", EmptyFlight);

        if (flightToUpdate.AirlineId !== userAirlineId) throw new FlightError("You are not authorized on the flight you are trying to add the comment to", EmptyFlight) //tenant security filter

        const newComment: commentType = {
            id: null,
            text,
            tags: String(tags),
            FlightId: flightId,
            UserId: user.id,
            AirlineId: userAirlineId
        }
        console.log(tags)
        console.log("algo---------------")
        await models.Comment.create(newComment)
        return handleFlightOk('Flight was modified. comment was included', flightToUpdate)

    } catch (e: any) {
        return handleFlightError(e);
    }
}