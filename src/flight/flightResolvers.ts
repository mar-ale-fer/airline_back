import { handleFlightCreate } from './flightCreate'
import { handleFlightUpdate } from './flightUpdate'
import { handleFlightDelete } from './flightDelete'
import { handleFlights } from './flightsQuery'
import { handleFlightById } from './flightByIdQuery'
import { handleAddCommentToFlight } from './AddCommentToFlight'
import { EmptyUser } from '../../types/userType'
export const resolvers = {
    Query: {
        flights: handleFlights,
        flightById: handleFlightById
    },
    Mutation: {
        flightCreate: handleFlightCreate,
        flightUpdate: handleFlightUpdate,
        flightDelete: handleFlightDelete,
        addCommentToFlight: handleAddCommentToFlight,
    },
    Flight: {
        //The attribute of Flight that returns the level
        comments: async (Flight: any, _: any, { models }: { models: any }) => {
            console.log(`--flight.comments. Flight.id:${Flight.id}`);

            const aFlight = await models.Flight.findByPk(Flight.id);
            if (!aFlight) return [];
            const comments = await aFlight.getComments();
            return comments;
        },
    },
    Comment: {
        //The attribute of Comment that returns the user
        user: async (Comment: any, _: any, { models }: { models: any }) => {
            console.log(`--Comment.user. Comment.id:${Comment.id}`);

            const aComment = await models.Comment.findByPk(Comment.id);
            if (!aComment) return EmptyUser;
            const user = await aComment.getUser();
            return user;
        },
    }
}