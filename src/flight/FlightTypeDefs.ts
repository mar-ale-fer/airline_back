const { gql } = require('apollo-server');

export const typeDefs = gql`
  type Query {
    flights(
      name: String!,
      debug: String!,
    ): FlightList!

    flightById(
      id: ID!,
      debug: String!,
      ):FlightCRUDResponse!
  }

  type FlightList{
    success: Boolean!
    message: String!
    flights: [Flight]
  }

  type Mutation {
    flightCreate(
      name: String!
    ): FlightCRUDResponse!
    flightUpdate(
      id: ID!
      name: String!
    ): FlightCRUDResponse!
    flightDelete(
      id: ID!
    ): FlightCRUDResponse!

    addCommentToFlight(
      flightId: ID!, 
      text: String!, 
      tags: [String]!
    ): FlightCRUDResponse!

  }
  type FlightCRUDResponse {
    success: Boolean!
    message: String!
    flight: Flight!
  }

  type Flight {
    id: ID! 
    name: String!
    comments:[Comment]
  }

  type Comment {
    id: ID!
    text: String!
    tags: String!
    flight: Flight!
    user: User!
  }
`;
